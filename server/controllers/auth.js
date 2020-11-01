const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.signup = (req, res, next) => {
    const {fullname, email, password} = req.body;

    User.findOne({email:email})
        .then(userDoc => {
            if(userDoc){
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)
        })
        .then(hashedPassword => {
            const user = new User({
                fullname: fullname,
                email: email,
                password: hashedPassword
            })
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: "User registred successfully"
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.login = (req, res, next) => {
    const {email, password} = req.body;
    let userData;
    
    User.findOne({email:email})
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: "User does not exists"
                })
            }
            userData = user;
            return bcrypt.compare(password, user.password)
        })
        .then(hashedPassword => {
            if(!hashedPassword){
                return res.json({
                    message: "Password does't matched"
                })
            }
            const token = jwt.sign({_id: hashedPassword._id}, 'trillow')
            userData.password =  undefined;

            return res.status(200).json({
                message: "Login successful",
                userData: userData,
                token: token
            })
            next()
        })
        .catch(err => {
            console.log(err)
        })
}

exports.isAuthenticated = (req, res, next) => {
    const {authorization} = req.headers
    if(authorization){
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, 'trillow', (err, payload)=>{
            if(err){
                return res.json({message: "Please Login First", success: false})
            }else{
                User.findOne({_id: payload._id}, (err, user)=>{
                    if(err){
                        return res.json({message: "Error Occured while fetching the data", success: false})
                    }else if(!user){
                        return res.json({message: "Invalid Credentials", success: false})
                    }else{
                        user.password = undefined
                        req.user = user
                        console.log(user)
                        next()
                    }
                    
                })
                
            }
        })
    }else{
        return res.json({message: "not available"})
    }
}
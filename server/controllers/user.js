const User = require('../models/User')

exports.homepage = (req, res, next) => {
    console.log('HI')
}


exports.profile = (req, res, next) => {
    const {fullname, password, profilePic} = req.body
    const userId = req.user._id
    User.findById(userId)
        console.log(userId)
        .then(user => {
            if(!user){
                return res.status(403).json({
                    message: 'User not found'
                })
            }else{
                console.log('Profile')
            }
        })
        .catch(err => {
            console.log(err)
        })
}
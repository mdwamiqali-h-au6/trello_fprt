const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        maxLength: 25,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileImage:{
        type: String,
    }
},{timestamps: true})

module.exports = mongoose.model('User', userSchema)
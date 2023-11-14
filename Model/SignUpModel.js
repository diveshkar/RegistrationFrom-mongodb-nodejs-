const mongoose = require('mongoose');
// const validator = require('validator');

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: [true, 'Please enter FirstName']
    },
    UserEmail: {
        type: String,
        required: [true, 'Please enter Email']
    },
    UserPassword: {
        type: String,
        required: [true, 'Please enter Password'],
        unique:true
    },
    UserType: {
        type: String,
        required: [true, 'Please enter UserType'],  
    },
   
})


module.exports = mongoose.model('UserData', UserSchema)
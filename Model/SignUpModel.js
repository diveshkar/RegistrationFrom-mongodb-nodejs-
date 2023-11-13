const mongoose = require('mongoose');
// const validator = require('validator');

const signUpSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: [true, 'Please enter FirstName']
    },
    UserEmail: {
        type: String,
        required: [true, 'Please enter LastName']
    },
    UserPassword: {
        type: String,
        required: [true, 'Please enter nic'],
        unique:true
    },
    UserType: {
        type: String,
        required: [true, 'Please enter email'],
        unique:true    
    },
   
})


module.exports = mongoose.model('SignUp', signUpSchema)
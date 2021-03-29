const mongoose = require('mongoose');
const { Schema } = mongoose;

userSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
    },

    givenName: {
        type: String,
    },

    lastName:{
        type: String,
    },

    emailVerified: {
        type: Boolean,
        required: true,
    },

    devices:[
        {
            deviceID:  String,   
        }
    ] 
});


module.exports = mongoose.model('users', userSchema);
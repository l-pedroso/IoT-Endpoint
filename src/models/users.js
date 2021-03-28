const mongoose = require('mongoose');
const { Schema } = mongoose;

userSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
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
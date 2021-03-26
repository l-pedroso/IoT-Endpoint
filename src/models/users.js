const mongoose = require('mongoose');
const { Schema } = mongoose;

userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    devices:[
        {
            deviceID:  String,   
        }
    ] 
});


module.exports = mongoose.model('users', userSchema);
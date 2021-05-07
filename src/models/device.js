const mongoose = require('mongoose');
const { Schema } = mongoose;


deviceSchema = new Schema({
    name: {
        type: String  
    },

    authToken: {
        type: String,
    },

    lastName:{
        type: String,
    },          
});


module.exports = mongoose.model('devices', deviceSchema);
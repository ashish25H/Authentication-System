const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        default:null,
    },
    lastname:{
        type:String,
        default:null,
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please fill this field']
    },
    password:{
        type:String,

    },
    token:{
        type:String,
    }
});

module.exports = mongoose.model('user',userSchema); 
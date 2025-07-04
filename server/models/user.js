const {Schema, model}= require('mongoose');

const userSchema= new Schema({
    fullName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    }
}, {timestamps: true})

const userModel= model('user', userSchema);

module.exports= userModel;
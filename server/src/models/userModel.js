const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    degreeName:{
        type:String,
        trim:true,
        enum:[],
    },
    year:{
        type:String,
        trim:true,
        enum:["1st","2nd","3rd","4th"],
    },
},{timestamps:true});

module.exports = mongoose.model("user",userSchema);
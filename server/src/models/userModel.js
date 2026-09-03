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
        required:true
    },
    degreeName:{
        type:String,
        trim:true,
        enum:["B.A.","B.Sc.","B.Com.","M.A.","M.Com."],
        required:true
    },
    year:{
        type:String,
        trim:true,
        enum:["1st","2nd","3rd","4th"],
        default: "1st"
    },
    role:{
        type:String,
        enum:["user","admin"],
        default: "user"
    },
    isEmailVerified:{
        type:Boolean,
        required:true,
        default:false
    },
},{timestamps:true});

module.exports = mongoose.model("user",userSchema);
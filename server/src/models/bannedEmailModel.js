const mongoose = require("mongoose");

const bannedEmailSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        lowercase: true,
        unique: true,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("bannedEmail", bannedEmailSchema);
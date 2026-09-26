const mongoose = require("mongoose");

const aiUsageSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },

    requestCount:{
        type: Number,
        default: 0
    },

    lastRequestDate:{
        type: Date,
        default: null
    }
},{timestamps:true});

module.exports = mongoose.model("aiUsage", aiUsageSchema);
const mongoose = require("mongoose");
const { applyTimestamps } = require("./noticeBoardModel");

const aiUsageSchema = new mongoose.schema({
    userid: {
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
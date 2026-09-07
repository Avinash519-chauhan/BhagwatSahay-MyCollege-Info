const mongoose = require("mongoose");

const noticeBoardSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    lastDate:{
        type: Date,
        required: true
    },
},{timestamps: true});


noticeBoardSchema.index(
    {createdAt:1},
    {expireAfterSeconds:20*24*60*60}
);

module.exports = mongoose.model("noticeBoard", noticeBoardSchema);
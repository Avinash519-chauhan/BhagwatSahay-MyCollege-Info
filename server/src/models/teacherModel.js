const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
    {
        teacherName: {
            type: String,
            trim: true,
            required: true
        },
        teacherImage: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            trim: true,
            required: true,
            enum: ["M.A.", "M.Com.", "B.A.", "B.Com.", "B.Sc.", "Faculty", "Sports", "Management"]
        },
        majorSubject: {
            type: String,
            trim: true
        },
        minorSubject: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        locatedRoomNo: {
            type: Number,
            required: true
        },
    }, { timestamps: true }
);

module.exports = mongoose.model("teacher",teacherSchema);
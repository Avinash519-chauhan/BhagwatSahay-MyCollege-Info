const NoticeBoardModel = require("../models/noticeBoardModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const { isValid, isValidObjectId } = require("../utils/validators");
const {sendNewNoticeNotification} = require("../utils/noticeNotificationService")

const createNotice = async (req, res) => {
    try {
        const noticeData = req.body;

        if (!noticeData || Object.keys(noticeData).length === 0) {
            return res.status(400).json({ msg: "Bad Request! No Data Provided" })
        }

        noticeData.userId = req.userId;

        if (!isValidObjectId(noticeData.userId)) {
            return res.status(400).json({ msg: "Invalid User Id" })
        }

        let { description, lastDate } = noticeData;

        if (!isValid(description)) {
            return res.status(400).json({ msg: "Description is Required" })
        }

        if (description !== undefined && description.trim() !== "") {
            const wordCount = description.trim().split(/\s+/).length;

            if (wordCount > 250) {
                return res.status(400).json({ msg: "Description must not exceed 250 words" })
            }
        }

        if (!isValid(lastDate)) {
            return res.status(400).json({ msg: "Last Date is Required" });
        }

        if (isNaN(new Date(lastDate).getTime())) {
            return res.status(400).json({ msg: "Invalid Last Date" });
        }

        const eventLastDate = new Date(lastDate);

        if (eventLastDate < new Date()) {
            return res.status(400).json({
                msg: "Last Date cannot be in the past"
            });
        }

        const existingNotice = await NoticeBoardModel.findOne({
            description: noticeData.description.trim(),
            lastDate: noticeData.lastDate
        });

        if (existingNotice) {
            return res.status(409).json({
                msg: "A similar notice has already been posted"
            });
        }

        if (!req.file) {
            return res.status(400).json({ msg: "Notice Image is Required" });
        }

        //upload temperary file to cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "notice"
        });

        //delete temperory file
        await fs.promises.unlink(req.file.path);

        noticeData.postImage = uploadResult.secure_url;

        let noticeAdded = await NoticeBoardModel.create(noticeData);

        sendNewNoticeNotification(noticeAdded).catch(error=>{
            console.log("Notice notification failed", error);
        })

        return res.status(201).json({ msg: "Notice Added SuccessFully", noticeAdded });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

const getNotice = async (req, res) => {
    try {
        let notices = await NoticeBoardModel.find();

        if (notices.length === 0) {
            return res.status(400).json({ msg: "No Notice Found" })
        }

        return res.status(200).json({ msg: "Notice's found Successfully", notices })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

const updateNotice = async (req, res) => {
    try {
        let noticeId = req.params.id;
        let noticeData = req.body;

        if (!isValidObjectId(noticeId)) {
            return res.status(400).json({ msg: "Invalid Notice Id" })
        }

        if ((!noticeData || Object.keys(noticeData).length === 0) && !req.file) {
            return res.status(400).json({ msg: "Bad Request! No Data Provided" })
        }

        const notice = await NoticeBoardModel.findById(noticeId);

        if (!notice) {
            return res.status(404).json({ msg: "Notice Not Found" })
        }

        let { description, lastDate } = noticeData;

        if (description !== undefined) {
            if (!isValid(description)) {
                return res.status(400).json({ msg: "Description is Required" })
            }

            if (description !== undefined && description.trim() !== "") {
                const wordCount = description.trim().split(/\s+/).length;

                if (wordCount > 250) {
                    return res.status(400).json({ msg: "Description is under 250 words" })
                }
            }
        }

        if (lastDate !== undefined) {
            if (!isValid(lastDate)) {
                return res.status(400).json({
                    msg: "Last Date cannot be empty"
                });
            }

            if (isNaN(new Date(lastDate).getTime())) {
                return res.status(400).json({
                    msg: "Invalid Last Date"
                });
            }
        }

        if (req.file !== undefined) {
            if (req.file) {
                return res.status(400).json({ msg: "Notice Image is Required" });
            }
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "notice"
            });
            await fs.promises.unlink(req.file.path);

            const oldPublicId = notice.postImage.split("/upload/")[1].replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");

            await cloudinary.uploader.destroy(oldPublicId);

            noticeData.postImage = uploadResult.secure_url;
        }

        const isOwner = notice.userId.toString() === req.userId.toString();

        if (!isOwner) {
            return res.status(403).json({
                msg: "You are not authorized to update this notice"
            });
        }

        let updatedNotice = await NoticeBoardModel.findByIdAndUpdate(
            noticeId,
            noticeData,
            { returnDocument: "after" }
        )

        return res.status(200).json({ msg: "Notice Updated Successfully", updatedNotice })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

const deleteNotice = async (req, res) => {
    try {
        let noticeId = req.params.id;

        if (!isValidObjectId(noticeId)) {
            return res.status(400).json({ msg: "Invalid Notice Id" })
        }

        let deletedNotice = await NoticeBoardModel.findById(noticeId);

        if (!deletedNotice) {
            return res.status(400).json({ msg: "Notice not Found" })
        }

        const isOwner = deletedNotice.userId.toString() === req.userId.toString();

        const isAdmin = req.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ msg: "You are not authorized to delete this notice" })
        }

        const publicId = deletedNotice.postImage.split("/upload/")[1].replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");

        await cloudinary.uploader.destroy(publicId);

        await NoticeBoardModel.findByIdAndDelete(noticeId);

        return res.status(200).json({ msg: "Notice Deleted SuccessFully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

module.exports = { createNotice, getNotice, updateNotice, deleteNotice };
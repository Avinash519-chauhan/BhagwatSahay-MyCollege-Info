const TeacherModel = require("../models/teacherModel");
const NoticeBoardModel = require("../models/noticeBoardModel");
const UserModel = require("../models/userModel");

const getDashboardStats = async(req,res)=>{
    try {
        const [teacherCount, noticeCount, userCount] = await Promise.all([
            TeacherModel.countDocuments(),
            NoticeBoardModel.countDocuments(),
            UserModel.countDocuments(),
        ]);

        return res.status(200).json({teacherCount,noticeCount,userCount})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

module.exports = {getDashboardStats};
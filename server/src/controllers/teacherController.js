const TeacherModel = require("../models/teacherModel");
const { isValid, isValidFullName } = require("../utils/validators")
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const createTeacherProfile = async (req, res) => {
    try {
        let teacherData = req.body;
        if (!teacherData || Object.keys(teacherData).length === 0) {
            return res.status(400).json({ msg: "Bad Request, No Data Provided" })
        }

        const { teacherName, degree, majorSubject, minorSubject, description, locatedRoomNo } = teacherData

        //teacher name
        if (!isValid(teacherName)) {
            return res.status(400).json({ msg: "Teacher Name is Required" })
        }

        if (!isValidFullName(teacherName)) {
            return res.status(400).json({ msg: "Invalid Name" })
        }

        //degree
        const degreeSubject = {
            "M.A.": [
                "History",
                "Political Science",
                "English"
            ],
            "M.Com.": [
                "Accounting",
                "Finance",
                "Economics"
            ],
            "B.A.": [
                "History",
                "Political Science",
                "English"
            ],
            "B.Com.": [
                "Accounting",
                "Economics"
            ],
            "B.Sc.": [
                "Mathematics",
                "Physics",
                "Chemistry",
                "Computer Science"
            ],
            "Faculty": [],
            "Sports": [],
            "Management": []
        };

        //degreeSubject
        if (!degreeSubject.hasOwnProperty(degree)) {
            return res.status(400).json({ msg: "Invalid Degree" })
        }

        //majorSubject
        if (degreeSubject[degree].length > 0 && !degreeSubject[degree].includes(majorSubject)) {
            return res.status(400).json({ msg: "Invalid Major Subject for Selected Degree" })
        }

        //minorSubject
        if (minorSubject && degreeSubject[degree].length > 0 && !degreeSubject[degree].includes(minorSubject)) {
            return res.status(400).json({ msg: "Invalid Minor Subject for Selected Degree" })
        }

        //description
        if (description !== undefined && description.trim() !== "") {
            const wordCount = description.trim().split(/\s+/).length;

            if (wordCount > 200) {
                return res.status(400).json({ msg: "Description is under 200 words" })
            }
        }

        //locatedRoom
        if (!isValid(locatedRoomNo)) {
            return res.status(400).json({ msg: "Room No. is Required" })
        }

        //teacherImage
        if (!req.file) {
            return res.status(400).json({ msg: "Teacher Image is Required" });
        }

        //upload temperary file to cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "teachers"
        });

        //delete temperory file
        await fs.promises.unlink(req.file.path);

        //add cloudinary url
        teacherData.teacherImage = uploadResult.secure_url;

        //create teacher in mongodb
        let teacherAdded = await TeacherModel.create(teacherData);

        return res.status(201).json({ msg: "Teacher Created SuccessFully", teacherAdded })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

const getTeacherProfile = async (req, res) => {
    try {
        let teacher = await TeacherModel.find();

        if (teacher.length === 0) {
            return res.status(404).json({ msg: "No Teacher Found" })
        }

        return res.status(200).json({ msg: "Teacher Data Fetched SuccessFully", teacher });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

const updateTeacherProfile = async (req, res) => {
    try {
        let teacherId = req.params.id;
        let teacherData = req.body;

        if (!teacherData || Object.keys(teacherData).length === 0 && !req.file) {
            return res.status(400).json({ msg: "Bad Request! No Data Found" })
        }

        let { teacherName, degree, majorSubject, minorSubject, description, locatedRoomNo } = teacherData;

        if (teacherName !== undefined) {
            if (!isValid(teacherName)) {
                return res.status(400).json({ msg: "Required Teacher Name" });
            }
            if (!isValidFullName(teacherName)) {
                return res.status(400).json({ msg: "Invalid Teacher Name" });
            }
        }

        const degreeSubject = {
            "M.A.": [
                "History",
                "Political Science",
                "English"
            ],
            "M.Com.": [
                "Accounting",
                "Finance",
                "Economics"
            ],
            "B.A.": [
                "History",
                "Political Science",
                "English"
            ],
            "B.Com.": [
                "Accounting",
                "Economics"
            ],
            "B.Sc.": [
                "Mathematics",
                "Physics",
                "Chemistry",
                "Computer Science"
            ],
            "Faculty": [],
            "Sports": [],
            "Management": []
        };

        if (teacherName !== undefined) {
            if (!isValid(teacherName)) {
                return res.status(400).json({ msg: "Required Teacher Name" });
            }
            if (!isValidFullName(teacherName)) {
                return res.status(400).json({ msg: "Invalid Teacher Name" });
            }
        }

        if (degree !== undefined) {
            if (!degreeSubject.hasOwnProperty(degree)) {
                return res.status(400).json({ msg: "Invalid Degree" })
            }
        }

        if (majorSubject !== undefined) {
            if (degreeSubject[degree].length > 0 && !degreeSubject[degree].includes(majorSubject)) {
                return res.status(400).json({ msg: "Invalid Major Subject for Selected Degree" })
            }
        }

        if (minorSubject !== undefined) {
            if (minorSubject && degreeSubject[degree].length > 0 && !degreeSubject[degree].includes(minorSubject)) {
                return res.status(400).json({ msg: "Invalid Minor Subject for Selected Degree" })
            }
        }

        if (description !== undefined) {
            if (description !== undefined && description.trim() !== "") {
                const wordCount = description.trim().split(/\s+/).length;

                if (wordCount > 200) {
                    return res.status(400).json({ msg: "Description is under 200 words" })
                }
            }
        }

        if (locatedRoomNo !== undefined) {
            if (!isValid(locatedRoomNo)) {
                return res.status(400).json({ msg: "Room No. is Required" })
            }
        }

        if (req.file !== undefined) {
            if (!req.file) {
                return res.status(400).json({ msg: "Teacher Image is Required" });
            }
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "teachers"
            });
            await fs.promises.unlink(req.file.path);

            const oldPublicId = teachers.teacherImage.split("/upload/")[1].replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");

            await cloudinary.uploader.destroy(oldPublicId);

            teacherData.teacherImage = uploadResult.secure_url;
        }

        let updateTeacher = await TeacherModel.findByIdAndUpdate(
            teacherId,
            teacherData,
            {returnDocument: "after"}
        )

        return res.status(201).json({msg: "Teacher Updated SuccessFully", updateTeacher})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

const deleteTeacher = async(req,res)=>{
    try {
        let teacherId = req.params.id;

        let deletedTeacher = await TeacherModel.findByIdAndDelete(teacherId);

        if(!deletedTeacher){
            return res.status(400).json({msg: "Teacher not Found or Already Deleted"})
        }

        return res.status(200).json({msg: "Teacher Profile Deleted"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

module.exports = { createTeacherProfile, getTeacherProfile, updateTeacherProfile, deleteTeacher };
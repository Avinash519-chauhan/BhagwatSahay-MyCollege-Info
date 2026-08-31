const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendConfermationEmail = require("../utils/sendEmail");

const {isValid,isValidFullName,isValidEmail,isValidPassword} = require("../utils/validators")

//Sign up
const signupUser = async (req, res) => {
    try {
        let userData = req.body;

        if (!userData || Object.keys(userData).length === 0) {
            return res.status(400).json({ msg: "Bad Request! No Data Provided" });
        }

        const { fullName, email, password, degreeName, year, role } = userData;

        //userName
        if (!isValid(fullName)) {
            return res.status(400).json({ msg: "Name is Required" })
        }
        if (!isValidFullName(fullName)) {
            return res.status(400).json({ msg: "Invalid Name" })
        }

        //userEmail
        if (!isValid(email)) {
            return res.status(400).json({ msg: "Email is Required" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ msg: "Invalid Email" })
        }

        let duplicateEmail = await UserModel.findOne({email});

        if (duplicateEmail) {
            return res.status(401).json({ msg: "Emial is already Exist" })
        }

        //userPassword
        if (!isValid(password)) {
            return res.status(400).json({ msg: "Password is Required" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).json({ msg: "Invalid Password" })
        }

        //degreeName
        if (!isValid(degreeName)) {
            return res.status(400).json({ msg: "Degree is Required" })
        }

        const validDegree = ["M.A.","M.Com.","B.A.","B.Com.","B.Sc."];

        if (!validDegree.includes(degreeName)) {
            return res.status(400).json({ msg: "Invalid Degree" })
        }

        //year
        if (!isValid(year)) {
            return res.status(400).json({ msg: "Year is Required" })
        }

        const validYear = ["1st","2nd","3rd","4th"];

        if (!validYear.includes(year)) {
            return res.status(400).json({ msg: "Invalid Year" })
        }

        //role
        if (role !== undefined) {
            if (role !== "user") {
                return res.status(400).json({ msg: "Invalid role" })
            }
        }

        //hashed password
        let hashedPassword = await bcrypt.hash(password, 10);
        userData.password = hashedPassword;

        //create user
        let userAdded = await UserModel.create(userData);

        //send confermation email
        await sendConfermationEmail(
            userAdded.email,
            userAdded.fullName
        );

        return res.status(201).json({ msg: "SignUp Successfully", userAdded });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });
    }
};

const loginUser = async(req,res)=>{
    try {
        let data = req.body;

        if(!data || Object.keys(data).length === 0){
            return res.status(400).json({msg:"Bad Request! No Data Provided"})
        }

        const {email, password} = data;

        //email
        if(!isValid(email)){
            return res.status(400).json({msg:"Email is Required"})
        }

        //password
        if(!isValid(password)){
            return res.status(400).json({msg:"Password is Required"})
        }

        let user = await UserModel.findOne({email});

        if(!user){
            return res.status(404).json({msg: "User Not Found"});
        }

        let passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(400).json({msg: "Incorrect Password"});
        }

        let token = jwt.sign(
            {
                userId: user._id,
                userRole: user.role,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            },
        );

        return res.status(200).json({msg: "Login Successfully", token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal server error"});
    }
};

//get profile
const getUser = async(req,res)=>{
    try {
        let userId = req.userId;

        let user = await UserModel.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({msg: "User Not Found"});
        }

        return res.status(200).json({msg: "Profile Fetched Successfully", user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal server Error"})
    }
}

//update profile
const updateProfile = async(req,res)=>{
    try {
        let userId = req.userId;
        let userData = req.body;

        if(!userData || Object.keys(userData).length === 0){
            return res.status(400).json({msg: "Bad Request! No Data Provided"})
        }

        let {fullName, email, password, degreeName, year} = userData;

        if(fullName !== undefined){
            if(!isValid(fullName)){
                return res.status(400).json({msg: "fullName is required"})
            }
            if(fullName.length < 2 || !isValidFullName(fullName)){
                return res.status(400).json({msg: "Invalid FullName"})
            }
        }

        if(email !== undefined){
            if(!isValid(email)){
                return res.status(400).json({msg: "Email is Reduired"})
            }
            if(!isValidEmail(email)){
                return res.status(400).json({msg: "Invalid Email"})
            }
            let duplicateEmail = await UserModel.findOne({
                email,
                _id : {$ne: userId}, 
            })
            if(duplicateEmail){
                return res.status(400).json({msg: "User Email already Exist"})
            }
        }
        if(password !== undefined){
            if(!isValid(password)){
                return res.status(400).json({msg: "Password is required"})
            }
            if(!isValidPassword(password)){
                return res.status(400).json({msg: "Invalid Password"})
            }
            let hashedPassword = await bcrypt.hash(password,10);
            userData.password = hashedPassword;
        }
        if(degreeName !== undefined){
            if(!isValid(degreeName)){
                return res.status(400).json({msg: "Degree is required"})
            }
            let validDegree = ["B.A.","B.Sc.","B.Com.","M.A.","M.Com."];
            if(!validDegree.includes(degreeName)){
                return res.status(400).json({msg: "Invalid Degree"})
            }
        }
        if(year !== undefined){
            if(!isValid(year)){
                return res.status(400).json({msg: "Year is Required"})
            }
            let validYear = ["1st","2nd","3rd","4th"];
            if(!validYear.includes(year)){
                return res.status(400).json({msg: "Invalid Year"})
            }
        }

        let updatedUserProfile = await UserModel.findByIdAndUpdate(
            userId,
            userData,
            {returnDocument:"after"},
        ).select("-password");

        return res.status(200).json({msg: "User Updated Successfully", updatedUserProfile})

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal server Error"})
    }
}

//delete user
const deleteUser = async(req,res)=>{
    try {
        let userId = req.userId;

        let deletedUser = await UserModel.findByIdAndDelete(userId);

        if(!deletedUser){
            return res.status(400).json({msg: "User is not Found, Already Deleted"})
        }

        return res.status(200).json({msg: "User Deleted Successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}


module.exports = {signupUser, loginUser, getUser, updateProfile, deleteUser};
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendConfermationEmail = async(to, name,verificationLink)=>{
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: "Verify Your Email",
        html:`
         <h2>Welcome ${name} In College_Info_Web</h2>
         
         <h4>Email Verification</h4>
         <p>Please click the link below to verify your email.</p>
         <a href="${verificationLink}"> Verify Email </a>
        `
    });
};

module.exports = sendConfermationEmail;
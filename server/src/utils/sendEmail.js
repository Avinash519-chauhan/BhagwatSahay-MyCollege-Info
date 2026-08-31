const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendConfermationEmail = async(to, name)=>{
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: "Registration Confirmation",
        html:`
         <h2>Welcome ${name} In College_Info</h2>
         <p>Your account has been successfully created.</p>
         <p>Thank you for registering.</p>
        `
    });
};

module.exports = sendConfermationEmail;
const transporter = require("./emailTransporter");

const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const sendConfermationEmail = async (to, name, verificationLink) => {
    const safeName = escapeHtml(name);

    await transporter.sendMail({
        from: `"College Info" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Verify Your Email",
        text: `Hello ${name}, open this link to verify your email (valid for 24 hours): ${verificationLink}`,
        html: `
         <h2>Welcome ${safeName} to College Info</h2>
         <h4>Email Verification</h4>
         <p>Please click the link below to verify your email. It is valid for 24 hours.</p>
         <p><a href="${verificationLink}">Verify Email</a></p>
         <p>If you don't see future emails, check your spam folder.</p>
        `,
    });
};

module.exports = sendConfermationEmail;
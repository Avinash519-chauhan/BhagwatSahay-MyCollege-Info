const UserModel = require("../models/userModel");
const transporter = require("./emailTransporter");

const sendNewNoticeNotification = async (notice) => {
    try {
        // Get verified users who have enabled notice notifications
        const users = await UserModel.find({
            isEmailVerified: true,
            noticeNotifications: true
        }).select("email");

        if (users.length === 0) {
            console.log("No users available for notice notification");
            return;
        }

        const userEmails = users.map(user => user.email).filter(Boolean);

        if (userEmails.length === 0) {
            return;
        }

        await transporter.sendMail({
            from: `"College Info" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            bcc: userEmails,
            subject: "New College Notice",
            html: `
                <h2>New Notice Posted</h2>

                <p>A new notice has been posted on the College Information Portal.</p>

                <p>
                    <strong>Notice:</strong><br>
                    ${notice.description}
                </p>

                <p>
                    <strong>Last Date:</strong>
                    ${new Date(notice.lastDate).toLocaleDateString("en-IN")}
                </p>

                <p>
                    Please visit the college portal to view the complete notice.
                </p>
            `
        });

        console.log(`Notice notification sent to ${userEmails.length} users`);

    } catch (error) {
        console.log("Notice notification error:", error);
        throw error;
    }
};

module.exports = { sendNewNoticeNotification };
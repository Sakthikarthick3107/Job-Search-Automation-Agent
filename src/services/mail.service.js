const nodemailer = require("nodemailer");
const {
    generateMail
} = require("../templates/mail.template");

async function sendMail(content) {

    const transporter =
        nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "🚀 Your Job Hunt Automation - Fresh Opportunities!",
        html: generateMail(content)
    });
}

module.exports = {
    sendMail
};
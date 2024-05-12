require("dotenv").config();
const nodemailer = require('nodemailer')

const sendMail = async (email) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: "false",
        auth: {
            user: process.env.EMAI_USER,
            pass: process.env.EMAI_PASS,
        }
    });
    let info = await transporter.sendMail({
        from: '"ADMIN THAI BINH" <thaibinh1000402@gmail.com>',
        to: email,
        subject: "Send api email",
        text: 'Hello'
    })
}

module.exports = sendMail;
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();
import db from '../models/index';

export const sendEmailService = async (email) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    let user = await db.User.findOne({
        where: { email: email },
    });

    if (!user) {
        return "Không tìm thấy email này trong hệ thống.";
    } else {
        // Tạo một mật khẩu mới
        const newPassword = generateNewPassword();

        // Hash mật khẩu mới
        const hashedPassword = await hashPassword(newPassword);

        // Cập nhật mật khẩu mới đã hash trong cơ sở dữ liệu
        await db.User.update({ matKhau: hashedPassword }, { where: { email: email } });

        // Gửi email với mật khẩu mới (không hash)
        let info = await transporter.sendMail({
            from: '"ADMIN THAI BINH" <thaibinh1000402@gmail.com>',
            to: email,
            subject: "Reset mật khẩu",
            text: `Mật khẩu mới của bạn là: ${newPassword}`,
            html: `<b>Mật khẩu mới của bạn là: ${newPassword}</b>`
        });
        return info;
    }
}

// Hàm tự định nghĩa để tạo mật khẩu mới
const generateNewPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newPassword = '';
    for (let i = 0; i < 8; i++) {
        newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return newPassword;
}

// Hàm hash mật khẩu
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

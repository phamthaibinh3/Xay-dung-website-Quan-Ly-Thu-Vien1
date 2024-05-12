import { sendEmailService } from '../services/EmailService.js';

export const sendEmailController = async (req, res) => {
    try {
        const { email } = req.body; // Lấy địa chỉ email từ req.body
        const result = await sendEmailService(email); // Truyền địa chỉ email vào hàm sendEmailService
        return res.json(result); // Trả về kết quả
    } catch (e) {
        console.log(e);
        return res.json({
            errCode: -1,
            errMessage: 'Loi Server'
        });
    }
};
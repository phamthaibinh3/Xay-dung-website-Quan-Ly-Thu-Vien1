import mail from '../services/mail';
import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let taiKhoan = req.body.taiKhoan;
    let matKhau = req.body.matKhau;
    if (!taiKhoan || !matKhau) {
        return res.status(500).json({
            errcode: 1,
            message: 'Bạn chưa nhập tài khoản hoặc mật khẩu',
        })
    }
    let userData = await userService.handleUserLogin(taiKhoan, matKhau);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Ban chua co id',
            users: []
        })
    }
    let users = await userService.getAllUser(id);
    // console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'oke',
        users
    })
}

let handleCreateUser = async (req, res) => {
    let message = await userService.createUser(req.body);
    // console.log(message);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "chưa có id"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}

let handleUpdateUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message)
}

let getAllcode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server',
        })
    }
}

let loginFacebook = async (req, res) => {
    try {
        let data = await userService.loginFacebook(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let doiMatKhau = async (req, res) => {
    try {
        let data = await userService.doiMatKhau(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let quanLyNhanVien = async (req, res) => {
    try {
        let data = await userService.quanLyNhanVien();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let quanLyKhachHang = async (req, res) => {
    try {
        let data = await userService.quanLyKhachHang();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}
let sendMail = async (req, res) => {
    try {
        const { email } = req.params
        if (email) {
            let data = await mail.sendMail(email);
            return res.status(200).json(data);
        }
        else res.json({
            errCode: '1',
            errMessage: 'Ko co email'
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Lỗi máy chủ khi gửi email'
        });
    }
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser,
    loginFacebook: loginFacebook,
    getAllcode: getAllcode,
    doiMatKhau: doiMatKhau,
    quanLyNhanVien: quanLyNhanVien,
    quanLyKhachHang: quanLyKhachHang,
    sendMail: sendMail
}
import nhaXuatBanService from '../services/nhaXuatBanService'

let themNhaXuatBan = async(req,res) => {
    try {
        let data = await nhaXuatBanService.themNhaXuatBan(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi server'
        })
    }
}

let layNhaXuatBan = async (req,res) => {
    try {
        let data = await nhaXuatBanService.layNhaXuatBan();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi server'
        })
    }
}

let xoaNhaXuatBan = async(req,res) => {
    try {
        let id = await nhaXuatBanService.xoaNhaXuatBan(req.query.id);
        return res.status(200).json(id)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Loi server'
        })
    }
}

let suaNhaXuatBan = async (req, res) => {
    try {
        let id = await nhaXuatBanService.suaNhaXuatBan(req.body);
        return res.status(200).json(id)
    } catch (e) {
        console.log(e);
        return res.status.json({
            errCode: -1,
            message: 'Loi server'
        })
    }
}

module.exports = {
    themNhaXuatBan, layNhaXuatBan, xoaNhaXuatBan, suaNhaXuatBan
}
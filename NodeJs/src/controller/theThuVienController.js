import theThuVienService from '../services/theThuVienService'

let themTheThuVien = async (req,res) => {
    try {
        let data = await theThuVienService.themTheThuVien(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let layTheThuVien = async(req,res) => {
    try {
        let data = await theThuVienService.layTheThuVien();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let xoaTheThuVien = async(req,res) => {
    try {
        let data = await theThuVienService.xoaTheThuVien(req.query.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let suaTheThuVien = async (req,res) => {
    try {
        let data = await theThuVienService.suaTheThuVien(req.query);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

module.exports = {
    themTheThuVien, layTheThuVien, xoaTheThuVien, suaTheThuVien
}
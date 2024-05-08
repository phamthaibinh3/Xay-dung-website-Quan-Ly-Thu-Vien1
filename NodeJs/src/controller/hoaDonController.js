import hoaDonService from '../services/hoaDonService'

let taoHoaDon = async (req, res) => {
    try {
        let data = await hoaDonService.taoHoaDon(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let layHoaDonTT = async (req, res) => {
    try {
        let data = await hoaDonService.layHoaDonTT();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let taoHoaDonTT = async (req, res) => {
    try {
        let data = await hoaDonService.taoHoaDonTT(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let xoaHoaDonTamThoi = async (req, res) => {
    try {
        let data = await hoaDonService.xoaHoaDonTamThoi(req.query.id);
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
    taoHoaDon, layHoaDonTT, taoHoaDonTT, xoaHoaDonTamThoi
}
import { reject } from 'lodash';
import phieuMuonService from '../services/phieuMuonService'

let layPhieuMuon = async (req, res) => {
    try {
        let data = await phieuMuonService.layPhieuMuon();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let taoPhieuMuon = async (req, res) => {
    try {
        let data = await phieuMuonService.taoPhieuMuon(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let duyetPhieuMuon = async (req, res) => {
    try {
        let data = await phieuMuonService.duyetPhieuMuon(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let huyPhieuMuon = async (req, res) => {
    try {
        let data = await phieuMuonService.huyPhieuMuon(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let traSach = async (req,res) => {
    try {
        let data = await phieuMuonService.traSach(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let layTraSach = async (req,res) => {
    try {
        let data = await phieuMuonService.layTraSach();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let thongKeSoLuongSachTraTrongThangHienTai = async (req,res) => {
    try {
        let data = await phieuMuonService.thongKeSoLuongSachTraTrongThangHienTai(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let thongKeSoLuongSachTraTrongThang = async (req,res) => {
    try {
        let data = await phieuMuonService.thongKeSoLuongSachTraTrongThang(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let thongKeSoLuongSachTraTheoThang = async (req,res) => {
    try {
        let data = await phieuMuonService.thongKeSoLuongSachTraTheoThang(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}



module.exports = {
    layPhieuMuon, taoPhieuMuon,
    duyetPhieuMuon, huyPhieuMuon,
    traSach, layTraSach, thongKeSoLuongSachTraTrongThangHienTai,
    thongKeSoLuongSachTraTrongThang, thongKeSoLuongSachTraTheoThang
}
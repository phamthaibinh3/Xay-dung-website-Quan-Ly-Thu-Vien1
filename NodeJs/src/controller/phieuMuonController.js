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

module.exports = {
    layPhieuMuon, taoPhieuMuon,
    duyetPhieuMuon, huyPhieuMuon
}
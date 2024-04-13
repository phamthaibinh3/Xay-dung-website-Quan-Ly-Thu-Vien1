import luotThichService from '../services/luotThichService'

let layLuotThich = async (req, res) => {
    try {
        let data = await luotThichService.layLuotThich();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let createLike = async (req, res) => {
    try {
        let response = await luotThichService.createLike(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let updateLike = async (req, res) => {
    try {
        let id = await luotThichService.updateLike(req.body);
        return res.status(200).json(id)
    } catch (e) {
        console.log(e);
        return res.status.json({
            errCode: -1,
            message: 'Loi server'
        })
    }
}

let trangThai = async (req, res) => {
    try {
        let id = await luotThichService.trangThai(req.body);
        return res.status(200).json(id)
    } catch (e) {
        console.log(e);
        return res.status.json({
            errCode: -1,
            message: 'Loi server'
        })
    }
}

let getStateLike = async(req,res) => {
    try {
        let data = await luotThichService.getStateLike();
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
    layLuotThich: layLuotThich,
    createLike: createLike,
    updateLike: updateLike,
    trangThai: trangThai,
    getStateLike: getStateLike
}
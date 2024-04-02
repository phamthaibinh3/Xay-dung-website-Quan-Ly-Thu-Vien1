import kindOfBookService from '../services/kindOfBookService'
let getLoaiSach = async (req, res) => {
    try {
        let data = await kindOfBookService.getLoaiSach();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi server'
        })
    }
}

let createLoaiSach = async(req,res) => {
    try {
        let data = await kindOfBookService.createLoaiSach(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi server',
        })
    }
}

let deleteLoaiSach = async (req,res) => {
    try {
        let id = await kindOfBookService.deleteLoaiSach(req.query.id);
        return res.status(200).json(id)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi server'
        })
    }
}

module.exports = {
    getLoaiSach: getLoaiSach,
    createLoaiSach: createLoaiSach,
    deleteLoaiSach: deleteLoaiSach
}
import luotThichService from '../services/luotThichService'

let taoLuotThich = async (req, res) => {
    try {
        let data = await luotThichService.taoLuotThich(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let layLuotThich = async (req,res) => { 
    try {
        let data = await luotThichService.layLuotThich();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi server'
        })
    }
}

module.exports = {
    taoLuotThich, layLuotThich
}
import staffService from '../services/staffService'

let getTopStaffHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await staffService.getTopStaffHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log('Loi sever: ', e);
        return res.status(200).json({
            errCode: -1,
            message: 'Loi server'
        })
    }
}

let getAllStaff = async (req, res) => {
    try {
        let staff = await staffService.getAllStaff();
        return res.status(200).json(staff)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Loi server',
        })
    }
}

let postSaveInfoStaff = async (req, res) => {
    try {
        let response = await staffService.postSaveInforSt(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log('Loi server: ', e);
        return res.status(200).json({
            errCode: -1,
            message: 'Loi sever'
        })
    }
}

module.exports = {
    getTopStaffHome: getTopStaffHome,
    getAllStaff: getAllStaff,
    postSaveInfoStaff: postSaveInfoStaff
}
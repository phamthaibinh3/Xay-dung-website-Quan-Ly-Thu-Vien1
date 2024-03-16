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

module.exports = {
    getTopStaffHome: getTopStaffHome
}
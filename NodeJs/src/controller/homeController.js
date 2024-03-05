import db from '../models/index';
import CRUDService from '../services/CRUDService'
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll({ raw: true });

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)        // truyền data ra views //chuyển data thành kiểu string
        })
    } catch (e) {
        // console.log(e);
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('hehe')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log(data);
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    // console.log(userId);
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log(userData);
        return res.render('edit-crud', {
            data: userData
        })
    } else {
        return res.send('không có id')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let allUser = await CRUDService.deleteUserById(id);
        return res.render('displayCRUD.ejs', {
            dataTable: allUser
        })
    } else {
        return res.send('ko tim thay id')
    }
    // return res.send('hehehe')

}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}
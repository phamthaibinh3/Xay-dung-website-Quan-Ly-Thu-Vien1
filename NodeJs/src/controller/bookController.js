import bookService from '../services/bookService'

let getAllBook = async (req, res) => {
    try {
        let data = await bookService.getAllBook();
        return res.status(200).json(data)
    } catch (e) {
        console.log('Loi sever', e);
        return res.status(200).json({
            errCode: -1,
            message: 'Loi server'
        })
    }
}

let CreateBook = async (req, res) => {
    try {
        let data = await bookService.CreateBook(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Loi server'
        })
    }
}

let deleteBook = async (req, res) => {
    try {
        let id = await bookService.deleteBook(req.query.id);
        return res.status(200).json(id)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Loi server'
        })
    }
}

let updateBook = async (req, res) => {
    try {
        let id = await bookService.updateBook(req.body);
        return res.status(200).json(id)
    } catch (e) {
        console.log(e);
        return res.status.json({
            errCode: -1,
            message: 'Loi server'
        })
    }
}

let getAllDanhMuc = async (req, res) => {
    try {
        let data = await bookService.getAllDanhMuc();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi server'
        })
    }
}

let addDanhMuc = async (req, res) => {
    try {
        let data = await bookService.addDanhMuc(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Loi server'
        })
    }
}

let deleteDanhMuc = async(req,res) => {
    try {
        let id = await bookService.deleteDanhMuc(req.query.id)
        return res.status(200).json(id)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi server'
        })
    }
}

let updateDanhMuc = async(req,res) => {
    try {
        let data = await bookService.updateDanhMuc(req.body);
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
    getAllBook: getAllBook,
    CreateBook: CreateBook,
    deleteBook: deleteBook,
    updateBook: updateBook,
    getAllDanhMuc: getAllDanhMuc,
    addDanhMuc: addDanhMuc,
    deleteDanhMuc: deleteDanhMuc,
    updateDanhMuc: updateDanhMuc
}
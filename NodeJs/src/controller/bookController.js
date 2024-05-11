import { reject } from 'lodash';
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

let deleteDanhMuc = async (req, res) => {
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

let updateDanhMuc = async (req, res) => {
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

let getBookNew = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let data = await bookService.getBookNew(limit);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let getBookId = async (req, res) => {
    try {
        let data = await bookService.getBookId(req.query.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let getBookOutstanding = async (req, res) => {
    try {
        let data = await bookService.getBookOutstanding();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let likeBook = async (req, res) => {
    try {
        let data = await bookService.likeBook(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}

let unlikeBook = async (req, res) => {
    try {
        let { bookId, userId } = req.body;
        let likedBook = await db.Like.findOne({
            where: {
                bookId: bookId,
                userId: userId
            }
        });

        if (!likedBook) {
            return res.status(200).json({
                message: 'Sách chưa được thích'
            });
        } else {
            await likedBook.destroy();

            let book = await db.Book.findByPk(bookId);
            await book.decrement('likes');

            return res.status(200).json({
                message: 'Bỏ thích sách thành công'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Lỗi server'
        });
    }
}

let getAllBookOutstanding = async(req,res) => {
    try {
        let data = await bookService.getAllBookOutstanding();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Lỗi server'
        });
    }
}

let getAllTaiLieuMoiNhat = async(req,res) => {
    try {
        let data = await bookService.getAllTaiLieuMoiNhat();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi Server'
        })
    }
}
let layDanhMucTheoData = async(req,res) => {
    try {
        let data = await bookService.layDanhMucTheoData(req.body);
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
    getAllBook: getAllBook,
    CreateBook: CreateBook,
    deleteBook: deleteBook,
    updateBook: updateBook,
    getAllDanhMuc: getAllDanhMuc,
    addDanhMuc: addDanhMuc,
    deleteDanhMuc: deleteDanhMuc,
    updateDanhMuc: updateDanhMuc,
    getBookNew: getBookNew,
    getBookId: getBookId,
    getBookOutstanding: getBookOutstanding,
    likeBook: likeBook,
    unlikeBook: unlikeBook,
    getAllBookOutstanding: getAllBookOutstanding,
    getAllTaiLieuMoiNhat: getAllTaiLieuMoiNhat,
    layDanhMucTheoData: layDanhMucTheoData
}
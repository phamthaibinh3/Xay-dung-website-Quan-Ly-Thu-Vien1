import bookService from '../services/bookService'

let getAllBook = async (req,res) => {
    try {
        let data = await bookService.getAllBook();
        return res.status(200).json(data)
    } catch (e) {
        console.log('Loi sever',e);
        return res.status(200).json({
            errCode:-1,
            message: 'Loi server'
        })
    }
}

module.exports = {
    getAllBook: getAllBook
}
import axios from '../axios'

let getAllLoaiSach = () => {
    return axios.get('/api/get-all-loai-sach')
}

let createLoaiSach = (data) => {
    return axios.post('/api/create-loai-sach', data)
}

export {
    getAllLoaiSach, createLoaiSach,
}
import axios from '../axios'

let getAllLoaiSach = () => {
    return axios.get('/api/get-all-loai-sach')
}

let createLoaiSach = (data) => {
    return axios.post('/api/create-loai-sach', data)
}

let deleteLoaiSach = (id) => {
    return axios.delete(`/api/delete-loai-sach?id=${id}`)
}

export {
    getAllLoaiSach, createLoaiSach, deleteLoaiSach
}
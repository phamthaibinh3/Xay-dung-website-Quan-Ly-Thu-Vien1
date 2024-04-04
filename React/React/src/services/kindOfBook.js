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

let getLoaiSachId = (id) => {
    return axios.get(`/api/get-loai-sach-id?id=${id}`)
}

let updateLoaiSach = (data) => {
    return axios.put('/api/update-loai-sach',data)
}

export {
    getAllLoaiSach, createLoaiSach, deleteLoaiSach, getLoaiSachId,
    updateLoaiSach
}
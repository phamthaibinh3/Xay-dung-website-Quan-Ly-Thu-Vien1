import axios from '../axios'
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { taiKhoan: userEmail, matKhau: userPassword });
}

const getAllUsers = (userId) => {
    return axios.get(`/api/get-all-user?id=${userId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-user', data)
}

const delteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}

const updateUserService = (inpuData) => {
    return axios.put('/api/update-user', inpuData)
}

export { handleLoginApi, getAllUsers, createNewUserService, delteUserService, updateUserService }
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

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopStaffHomeService = (limit) => {
    return axios.get(`/api/top-staff-home?limit=${limit}`)
}

const getAllStaff = () => {
    return axios.get('/api/get-all-staff')
}

const saveDetailStaff = (data) => {
    return axios.post('/api/save-infor-staff', data)
}

const getDetailStaff = (inputId) => {
    return axios.get(`/api/get-detail-staff-by-id?id=${inputId}`)
}
const saveBulkScheduleStaff = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleStaffByDate = (nhanVienId,ngay) => {
    return axios.get(`/api/get-schedule-staff-by-date?nhanVienId=${nhanVienId}&ngay=${ngay}`)
}

export {
    handleLoginApi, getAllUsers, createNewUserService,
    delteUserService, updateUserService, getAllCodeService,
    getTopStaffHomeService, getAllStaff, saveDetailStaff,
    getDetailStaff, saveBulkScheduleStaff, getScheduleStaffByDate
}
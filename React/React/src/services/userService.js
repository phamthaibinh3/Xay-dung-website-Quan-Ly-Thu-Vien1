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

const getScheduleStaffByDate = (nhanVienId, ngay) => {
    return axios.get(`/api/get-schedule-staff-by-date?nhanVienId=${nhanVienId}&ngay=${ngay}`)
}

const getAllSBook = () => {
    return axios.get('/api/get-all-book')
}

const createBook = (data) => {
    return axios.post('/api/create-book', data)
}

const deleteBook = (id) => {
    return axios.delete(`/api/delete-book?id=${id}`)
}

const updateBook = (data) => {
    return axios.put(`/api/update-book`, data)
}

const getAllDanhMuc = () => {
    return axios.get('/api/get-all-danh-muc')
}

const createDanhMuc = (data) => {
    return axios.post('/api/add-danh-muc', data)
}

const deleteDanhMuc = (id) => {
    return axios.delete(`/api/delete-danh-muc?id=${id}`)
 }

const updateDanhMuc = (data) => {
    return axios.put('/api/update-danh-muc',data)
}

const getTaiLieuNoiBat = () => {
    return axios.get('/api/get-book-outstanding')
}


let hoaDon = (data) => {
    return axios.post('/api/tao-hoa-don',data)
}



let layNhaXuatBan = () => {
    return axios.get('/api/get-nha-xuat-ban')
}

let themNhaXuatBan = (data) => {
    return axios.post('/api/tao-nha-xuat-ban',data)
}

let xoaNhaXuatBan = (id) => {
    return axios.delete(`/api/xoa-nha-xuat-ban?id=${id}`)
}

let suaNhaXuatBan = (data) => {
    return axios.put('/api/sua-nha-xuat-ban',data)
}

let layTheThanhVien = () => {
    return axios.get('/api/lay-the-thu-vien')
}

let taoTheThanhVien = (data) => {
    return axios.post('/api/tao-the-thu-vien',data)
}

let xoaTheThanhVien = (id) => {
    return axios.delete(`/api/xoa-the-thu-vien?id=${id}`)
}

let taoLuotThich = (data) => {
    return axios.post('/api/tao-luot-thich',data)
}

let loginFacebook = (data) => {
    return axios.post('/api/loginFacebook',data)
}

let getLuotThich = () => {
    return axios.get('/api/get-luot-thich')
}

const phieuMuon = (data) => {
    return axios.post('/api/tao-phieu-muon',data)
}

const layPhieuMuon = () =>{
    return axios.get('/api/get-phieu-muon')
}

const duyetPhieuMuon = (data) => {
    return axios.post('/api/duyet-phieu-muon',data);
}

const huyPhieuMuon = (data) => {
    return axios.post('/api/huy-phieu-muon',data)
}

let getHoaDonTamThoi = () => {
    return axios.get('/api/lay-hoa-don-tam-thoi')
}

let taoHoaDonTamThoi = (data) => {
    return axios.post('/api/tao-hoa-don-tam-thoi', data)
}

let xoaHoaDonTamThoi = (data) => {
    return axios.delete(`/api/xoa-hoa-don-tam-thoi?id=${data}`)
}

let getAllTLNB = () => {
    return axios.get('/api/get-all-book-outstanding')
}

let getAllTLMN = () => {
    return axios.get('/api/get-all-book-tai-lieu-moi')
}

let traSach = (data) => {
    return axios.post('/api/tra-sach',data)
}

let layTraSach = () => {
    return axios.get('/api/lay-tra-sach')
}



export {
    handleLoginApi, getAllUsers, createNewUserService,
    delteUserService, updateUserService, getAllCodeService,
    getTopStaffHomeService, getAllStaff, saveDetailStaff,
    getDetailStaff, saveBulkScheduleStaff, getScheduleStaffByDate,
    getAllSBook, createBook, deleteBook, updateBook, getAllDanhMuc,
    createDanhMuc, deleteDanhMuc, updateDanhMuc, getTaiLieuNoiBat,
    phieuMuon, hoaDon, getHoaDonTamThoi, taoHoaDonTamThoi, xoaHoaDonTamThoi,
    layNhaXuatBan, themNhaXuatBan, xoaNhaXuatBan, suaNhaXuatBan,
    layTheThanhVien, taoTheThanhVien, xoaTheThanhVien, taoLuotThich,
    loginFacebook, getLuotThich, layPhieuMuon, duyetPhieuMuon, huyPhieuMuon,
    getAllTLNB, getAllTLMN, traSach, layTraSach

}
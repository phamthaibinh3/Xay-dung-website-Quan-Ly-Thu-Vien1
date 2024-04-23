import actionTypes from './actionTypes'
import {
    getAllCodeService, createNewUserService, getAllUsers,
    delteUserService, updateUserService, getTopStaffHomeService,
    getAllStaff, saveDetailStaff, getAllSBook, createBook, deleteBook,
    updateBook, getAllDanhMuc, createDanhMuc, deleteDanhMuc, updateDanhMuc, hoaDon,
    getHoaDonTamThoi, taoHoaDonTamThoi, xoaHoaDonTamThoi
}
    from '../../services/userService';
import { getBookByID } from '../../services/bookService'
import { getAllLoaiSach, createLoaiSach, deleteLoaiSach, updateLoaiSach } from '../../services/kindOfBook'
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("GIOITINH");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log('Loi start Redux', e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchVaiTroSuccess = (vaiTroInput) => ({
    type: actionTypes.FETCH_VAITRO_SUCCESS,
    data: vaiTroInput
})

export const fetchVaiTroFail = () => ({
    type: actionTypes.FETCH_VAITRO_FAIL
})

export const fetchVaiTroStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("VAITRO");
            if (res && res.errCode === 0) {
                dispatch(fetchVaiTroSuccess(res.data));
            } else {
                dispatch(fetchVaiTroFail());
            }
        } catch (e) {
            dispatch(fetchVaiTroFail());
            console.log('Loi start Redux', e);
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Tạo mới người dùng thanh công')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('Loi start Redux', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
})
export const saveUserFailed = () => ({
    type: 'CREATE_USER_FAILED'
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFail());
            }
        } catch (e) {
            dispatch(fetchAllUserFail());
            console.log('Loi start Redux', e);
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: 'FETCH_ALL_USER_SUCCESS',
    users: data
})

export const fetchAllUserFail = () => ({
    type: 'FETCH_ALL_USER_FAIL',
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await delteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Xóa người dùng thanh công')
                dispatch(deleteSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(deleteFailed());
            }
        } catch (e) {
            dispatch(deleteFailed());
            console.log('Loi start Redux', e);
        }
    }
}

export const deleteSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})
export const deleteFailed = (data) => ({
    type: actionTypes.DELETE_USER_FAILED,

})

export const updateUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Sửa người dùng thanh công')
                dispatch(updateSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(updateFailed());
            }
        } catch (e) {
            dispatch(updateFailed());
            console.log('Loi start Redux', e);
        }
    }
}

export const updateSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const updateFailed = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const fetchTopStaff = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopStaffHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_STAFF_SUCCESS,
                    dataStaff: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_STAFF_FAIL,
                })
            }
        } catch (error) {
            console.log('FETCH_TOP_STAFF_FAIL: ', error);
            dispatch({
                type: actionTypes.FETCH_TOP_STAFF_FAIL
            })
        }
    }
}
export const fetchAllStaff = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllStaff();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_STAFF_SUCCESS,
                    dataSt: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_STAFF_FAIL,
                })
            }
        } catch (error) {
            console.log('FETCH_ALL_STAFF_FAIL: ', error);
            dispatch({
                type: actionTypes.FETCH_ALL_STAFF_FAIL
            })
        }
    }
}

export const saveDetailStaff1 = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailStaff(data);
            if (res && res.errCode === 0) {
                toast.success('Thêm thông tin nhân viên thanh công')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_STAFF_SUCCESS,
                })
            } else {
                toast.error('Thêm thông tin nhân viên không thành công2')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_STAFF_FAIL,
                })
            }
        } catch (error) {
            console.log('SAVE_DETAIL_STAFF_FAIL: ', error);
            toast.error('Thêm thông tin nhân viên không thành công1')
            dispatch({
                type: actionTypes.SAVE_DETAIL_STAFF_FAIL
            })
        }
    }
}

export const fetchAllSchedule = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('THOIGIAN');
            if (res && res.errCode === 0) {
                dispatch({
                    type: 'FETCH_ALLCODE_SCHEDULE_SUCCESS',
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: 'FETCH_ALLCODE_SCHEDULE_FAIL',
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_FAIL', e);
            toast.error('FETCH_ALLCODE_SCHEDULE_FAIL')
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_FAIL
            })
        }
    }
}

export const fetchAllBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSBook();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_BOOK_SUCCESS,
                    dataAllBook: res.data
                })
            } else {
                console.log('GET_ALL_BOOK_FAIL');
                dispatch({
                    type: actionTypes.GET_ALL_BOOK_FAIL,
                })
            }
        } catch (e) {
            console.log('GET_ALL_BOOK_FAIL', e);
            toast.error('GET_ALL_BOOK_FAIL')
            dispatch({
                type: actionTypes.GET_ALL_BOOK_FAIL
            })
        }
    }
}

export const createBook1 = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createBook(data)
            if (res && res.errCode === 0) {
                toast.success('Thêm sách thành công');
                dispatch({
                    type: actionTypes.CREATE_BOOK_SUCCESS
                })
            } else {
                dispatch({
                    type: actionTypes.CREATE_BOOK_FAIL
                })
            }
        } catch (e) {
            console.log('CREATE_BOOK_FAIL', e);
            dispatch({
                type: actionTypes.CREATE_BOOK_FAIL
            })
        }
    }
}

export const deleteBook1 = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBook(id)
            if (res && res.errCode === 0) {
                toast.success('Xóa sách thành công');
                dispatch({
                    type: actionTypes.DELETE_BOOK_SUCCESS
                })
            } else {
                dispatch({
                    type: actionTypes.DELETE_BOOK_FAIL
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.DELETE_BOOK_FAIL
            })
        }
    }
}

export const updateBook1 = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBook(id)
            if (res && res.errCode === 0) {
                toast.success('Sửa sách thành công');
                dispatch({
                    type: actionTypes.UPDATE_BOOK_SUCCESS
                })
            } else {
                dispatch({
                    type: actionTypes.UPDATE_BOOK_FAIL
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.UPDATE_BOOK_FAIL
            })
        }
    }
}

export const fetchChuyenMucStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDanhMuc();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_CHUYEN_MUC_SUCCESS,
                    dataChuyenMuc: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_CHUYEN_MUC_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_CHUYEN_MUC_FAIL', e);
            dispatch({
                type: actionTypes.FETCH_CHUYEN_MUC_FAIL
            })
        }
    }
}

export const createCategory = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createDanhMuc(data)
            if (res && res.errCode === 0) {
                toast.success('Thành công')
                dispatch({
                    type: actionTypes.CREATE_CATEGORY_SUCCSESS
                })
            } else {
                toast.error(res.errMessage)
                dispatch({
                    type: actionTypes.CREATE_CATEGORY_FAIL
                })
            }
        } catch (e) {
            console.log('CREATE_CATEGORY_FAIL', e);
            dispatch({
                type: actionTypes.CREATE_CATEGORY_FAIL
            })
        }
    }
}

export const deleteCategory = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteDanhMuc(id);
            console.log('check res: ', res);
            if (res && res.errCode === 0) {
                toast.success('Xóa thành công');
                dispatch({
                    type: actionTypes.DELETE_CATEGORY_SUCCSESS
                })
            } else {
                toast.error('Xóa thất bại');
                dispatch({
                    type: actionTypes.DELETE_CATEGORY_FAIL
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.DELETE_CATEGORY_FAIL
            })
        }
    }
}

export const updateCategory = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateDanhMuc(id)
            if (res && res.errCode === 0) {
                console.log('check res: ', res);
                toast.success('Sửa thành công');
                dispatch({
                    type: actionTypes.UPDATE_CATEGORY_SUCCSESS
                })
            } else {
                toast.error('Sửa thất bại');
                dispatch({
                    type: actionTypes.UPDATE_CATEGORY_FAIL
                })
            }
        } catch (e) {
            console.log('UPDATE_CATEGORY_FAIL', e);
            dispatch({
                type: actionTypes.UPDATE_CATEGORY_FAIL
            })
        }
    }
}

export const fectchAllKindOfBook = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllLoaiSach()
            if (res && res.errCode === 0) {
                // toast.success('Sửa thành công');
                dispatch({
                    type: actionTypes.FETCH_ALL_KINDOFBOOK_SUCCSESS,
                    dataLoaiSach: res.data
                })
            } else {
                // toast.error('Sửa thất bại');
                dispatch({
                    type: actionTypes.FETCH_ALL_KINDOFBOOK_FAIL
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_KINDOFBOOK_FAIL', e);
            dispatch({
                type: actionTypes.FETCH_ALL_KINDOFBOOK_FAIL
            })
        }
    }
}

export const createKindOfBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createLoaiSach(data)
            if (res && res.errCode === 0) {
                toast.success('Thêm thành công');
                dispatch({
                    type: actionTypes.CREATE_KINDOFBOOK_SUCCSESS,
                    dataLoaiSach: res.data
                })
            } else {
                toast.error(res.errMessage);
                dispatch({
                    type: actionTypes.CREATE_KINDOFBOOK_FAIL
                })
            }
        } catch (e) {
            console.log('CREATE_KINDOFBOOK_FAIL', e);
            dispatch({
                type: actionTypes.CREATE_KINDOFBOOK_FAIL
            })
        }
    }
}

export const deleteKindOfBook = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteLoaiSach(id)
            console.log('check res: ', res);
            if (res && res.errCode === 0) {
                toast.success('Xóa thành công');
                dispatch({
                    type: actionTypes.DELETE_KINDOFBOOK_SUCCSESS,
                })
            } else {
                toast.error(res.errMessage);
                dispatch({
                    type: actionTypes.DELETE_KINDOFBOOK_FAIL
                })
            }
        } catch (e) {
            console.log('DELETE_KINDOFBOOK_FAIL', e);
            dispatch({
                type: actionTypes.DELETE_KINDOFBOOK_FAIL
            })
        }
    }
}

export const updateKindOfBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateLoaiSach(data)
            console.log('check res: ', res);
            if (res && res.errCode === 0) {
                toast.success('Xóa thành công');
                dispatch({
                    type: actionTypes.UPDATE_KINDOFBOOK_SUCCSESS,
                })
            } else {
                toast.error(res.errMessage);
                dispatch({
                    type: actionTypes.UPDATE_KINDOFBOOK_FAIL
                })
            }
        } catch (e) {
            console.log('UPDATE_KINDOFBOOK_FAIL', e);
            dispatch({
                type: actionTypes.UPDATE_KINDOFBOOK_FAIL
            })
        }
    }
}

export const getBookID = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getBookByID(id);
            console.log('check res: ', res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_BOOK_ID_SUCCESS,
                    dataBookID: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_BOOK_ID_FAIL
                })
            }
        } catch (e) {
            console.log('GET_BOOK_ID_FAIL', e);
            dispatch({
                type: actionTypes.GET_BOOK_ID_FAIL
            })
        }
    }
}

export const handleHoaDon = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await hoaDon(data);
            console.log('check res: ', res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.HOA_DON_SUCCESS,
                    dataBookID: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.HOA_DON_FAIL
                })
            }
        } catch (e) {
            console.log('HOA_DON_FAIL', e);
            dispatch({
                type: actionTypes.HOA_DON_FAIL
            })
        }
    }
}

export const createHoaDonTT = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await taoHoaDonTamThoi(data);
            if (res && res.errCode === 0) {
                toast.success('Thêm thành công');
                dispatch({
                    type: actionTypes.CREATE_HOA_DON_TT_SUCCESS,
                })
            } else {
                dispatch({
                    type: actionTypes.CREATE_HOA_DON_TT_FAIL
                })
            }
        } catch (e) {
            console.log('CREATE_HOA_DON_TT_FAIL', e);
            dispatch({
                type: actionTypes.CREATE_HOA_DON_TT_FAIL
            })
        }
    }
}

export const getHoaDonTT = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getHoaDonTamThoi();
            if (res && res.errCode === 0) {
                // toast.success('Thêm thành công');
                dispatch({
                    type: actionTypes.GET_HOA_DON_TT_SUCCESS,
                    hoaDonTT: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_HOA_DON_TT_FAIL
                })
            }
        } catch (e) {
            console.log('GET_HOA_DON_TT_FAIL', e);
            dispatch({
                type: actionTypes.GET_HOA_DON_TT_FAIL
            })
        }
    }
}

export const deleteHoaDonTT = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await xoaHoaDonTamThoi(data);
            console.log('check res: ', res);
            if (res && res.errCode === 0) {
                toast.success('Xóa thành công');
                dispatch({
                    type: actionTypes.DELLETE_HOA_DON_TT_SUCCESS,
                    hoaDonTT: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.DELLETE_HOA_DON_TT_FAIL
                })
            }
        } catch (e) {
            console.log('DELLETE_HOA_DON_TT_FAIL', e);
            dispatch({
                type: actionTypes.DELLETE_HOA_DON_TT_FAIL
            })
        }
    }
}
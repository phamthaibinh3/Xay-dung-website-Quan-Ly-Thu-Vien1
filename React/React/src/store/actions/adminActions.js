import actionTypes from './actionTypes'
import {
    getAllCodeService, createNewUserService, getAllUsers,
    delteUserService, updateUserService, getTopStaffHomeService,
    getAllStaff, saveDetailStaff, getAllSBook, createBook, deleteBook,
    updateBook
}
    from '../../services/userService';
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
            let res = await getAllCodeService("TENDANHMUC");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_CHUYEN_MUC_SUCCESS,
                    dataChuyenMuc: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_CHUYEN_MUC_FAIL
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_CHUYEN_MUC_FAIL
            });
            console.log('Loi start Redux', e);
        }
    }
}
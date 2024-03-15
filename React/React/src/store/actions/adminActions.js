import actionTypes from './actionTypes'
import { getAllCodeService, createNewUserService } from '../../services/userService';
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
                dispatch(saveUserSuccess());
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
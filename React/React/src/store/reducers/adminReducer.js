import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    topStaff: [],
    allStaff: [],
    allSchedule: [],
    allbook: [],
    chuyenMuc: [],
    loaiSach: [],
    idSach: [],
    hoaDonTT: [],
    nhaXB: [],
    theThanhVien: [],
    idFB: [],
    luotThich: [],
    phieuMuon: [],
    taiLieuNoiBat: [],
    taiLieuMoiNhat: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('hehashdhasdh START: ', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            // console.log('hehashdhasdh SUCCESS: ', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            // console.log('hehashdhasdh FAILED: ', action);
            return {
                ...state,
            }

        case actionTypes.FETCH_VAITRO_SUCCESS:
            state.roles = action.data
            console.log('hehashdhasdh SUCCESS: ', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_vaitro_FAILED:
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_STAFF_SUCCESS:
            state.topStaff = action.dataStaff;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_STAFF_SUCCESS:
            state.allStaff = action.dataSt;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_STAFF_FAIL:
            state.allStaff = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS:
            state.allSchedule = action.dataTime;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_FAIL:
            state.allStaff = [];
            return {
                ...state,
            }

        case actionTypes.GET_ALL_BOOK_SUCCESS:
            state.allbook = action.dataAllBook;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_BOOK_FAIL:
            state.allbook = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_CHUYEN_MUC_SUCCESS:
            state.chuyenMuc = action.dataChuyenMuc;
            return {
                ...state,
            }
        case actionTypes.FETCH_CHUYEN_MUC_FAIL:
            state.chuyenMuc = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_KINDOFBOOK_SUCCSESS:
            state.loaiSach = action.dataLoaiSach;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_KINDOFBOOK_FAIL:
            state.loaiSach = [];
            return {
                ...state,
            }
        case actionTypes.GET_BOOK_ID_SUCCESS:
            state.idSach = action.dataBookID;
            return {
                ...state,
            }
        case actionTypes.GET_BOOK_ID_FAIL:
            state.idSach = [];
            return {
                ...state,
            }
        case actionTypes.GET_HOA_DON_TT_SUCCESS:
            state.hoaDonTT = action.hoaDonTT;
            return {
                ...state,
            }
        case actionTypes.GET_HOA_DON_TT_FAIL:
            state.hoaDonTT = [];
            return {
                ...state,
            }

        case actionTypes.GET_NXB_SUCCESS:
            state.nhaXB = action.nxb;
            return {
                ...state,
            }
        case actionTypes.GET_NXB_FAIL:
            state.nhaXB = [];
            return {
                ...state,
            }

        case actionTypes.GET_THE_THANH_VIEN_SUCCESS:
            state.theThanhVien = action.dataTheThuVien;
            return {
                ...state,
            }
        case actionTypes.GET_THE_THANH_VIEN_FAIL:
            state.theThanhVien = [];
            return {
                ...state,
            }
            
        case actionTypes.LOGIN_FACEBOOK_SUCCESS:
            state.idFB = action.idFacebook;
            return {
                ...state,
            }
        case actionTypes.LOGIN_FACEBOOK_FAIL:
            state.idFB = [];
            return {
                ...state,
            }

        case actionTypes.GET_LUOTTHICH_SUCCESS:
            state.luotThich = action.dataLuotThich;
            return {
                ...state,
            }
        case actionTypes.GET_LUOTTHICH_FAIL:
            state.luotThich = [];
            return {
                ...state,
            }
            
        case actionTypes.GET_PHIEUMUON_SUCCESS:
            state.phieuMuon = action.dataPhieuMuon;
            return {
                ...state,
            }
        case actionTypes.GET_PHIEUMUON_FAIL:
            state.phieuMuon = [];
            return {
                ...state,
            }

        case actionTypes.GET_ALL_TLNB_SUCCESS:
            state.taiLieuNoiBat = action.dataAllTLNB;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_TLNB_FAIL:
            state.taiLieuNoiBat = [];
            return {
                ...state,
            }

        case actionTypes.GET_ALL_TLMN_SUCCESS:
            state.taiLieuMoiNhat = action.dataAllTLMN;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_TLMN_FAIL:
            state.taiLieuMoiNhat = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;
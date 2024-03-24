import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    topStaff: [],
    allStaff: [],
    allSchedule: [],
    allbook: [],
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
            console.log('hehashdhasdh SUCCESS: ', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('hehashdhasdh FAILED: ', action);
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
        default:
            return state;
    }
}

export default adminReducer;
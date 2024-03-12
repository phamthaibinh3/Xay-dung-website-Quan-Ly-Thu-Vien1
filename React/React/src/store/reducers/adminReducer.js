import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
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
        case actionTypes.FETCH_VAITRO_FAIL:
            console.log('hehashdhasdh FAILED: ', action);
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;
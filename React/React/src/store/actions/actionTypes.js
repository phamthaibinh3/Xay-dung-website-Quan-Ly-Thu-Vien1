const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',


    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    FETCH_VAITRO_SUCCESS: 'FETCH_VAITRO_SUCCESS',
    FETCH_VAITRO_FAIL: 'FETCH_VAITRO_FAIL',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAIL: 'FETCH_ALL_USER_FAIL',

    FETCH_TOP_STAFF_SUCCESS: 'FETCH_TOP_STAFF_SUCCESS',
    FETCH_TOP_STAFF_FAIL: 'FETCH_TOP_STAFF_FAIL',

    FETCH_ALL_STAFF_SUCCESS: 'FETCH_ALL_STAFF_SUCCESS',
    FETCH_ALL_STAFF_FAIL: 'FETCH_ALL_STAFF_FAIL',

    SAVE_DETAIL_STAFF_SUCCESS: 'SAVE_DETAIL_STAFF_SUCCESS',
    SAVE_DETAIL_STAFF_FAIL: 'SAVE_DETAIL_STAFF_FAIL',
})

export default actionTypes;
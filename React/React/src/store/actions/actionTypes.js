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

    FETCH_ALLCODE_SCHEDULE_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_FAIL: 'FETCH_ALLCODE_SCHEDULE_FAIL',

    GET_ALL_BOOK_SUCCESS: 'GET_ALL_BOOK_SUCCESS',
    GET_ALL_BOOK_FAIL: 'GET_ALL_BOOK_FAIL',

    CREATE_BOOK_SUCCESS: 'CREATE_BOOK_SUCCESS',
    CREATE_BOOK_FAIL: 'CREATE_BOOK_FAIL',

    DELETE_BOOK_SUCCESS: 'DELETE_BOOK_SUCCESS',
    DELETE_BOOK_FAIL: 'DELETE_BOOK_FAIL',

    UPDATE_BOOK_SUCCESS: 'UPDATE_BOOK_SUCCESS',
    UPDATE_BOOK_FAIL: 'UPDATE_BOOK_FAIL',

    FETCH_CHUYEN_MUC_SUCCESS: 'FETCH_CHUYEN_MUC_SUCCESS',
    FETCH_CHUYEN_MUC_FAIL: 'FETCH_CHUYEN_MUC_FAIL',

    CREATE_CATEGORY_SUCCSESS: 'CREATE_CATEGORY_SUCCSESS',
    CREATE_CATEGORY_FAIL: 'CREATE_CATEGORY_FAIL',

    DELETE_CATEGORY_SUCCSESS: 'DELETE_CATEGORY_SUCCSESS',
    DELETE_CATEGORY_FAIL: 'DELETE_CATEGORY_FAIL',

    UPDATE_CATEGORY_SUCCSESS: 'UPDATE_CATEGORY_SUCCSESS',
    UPDATE_CATEGORY_FAIL: 'UPDATE_CATEGORY_FAIL',

    FETCH_ALL_KINDOFBOOK_SUCCSESS: 'FETCH_ALL_KINDOFBOOK_SUCCSESS',
    FETCH_ALL_KINDOFBOOK_FAIL: 'FETCH_ALL_KINDOFBOOK_FAIL',

    CREATE_KINDOFBOOK_SUCCSESS: 'CREATE_KINDOFBOOK_SUCCSESS',
    CREATE_KINDOFBOOK_FAIL: 'CREATE_KINDOFBOOK_FAIL',

    DELETE_KINDOFBOOK_SUCCSESS: 'DELETE_KINDOFBOOK_SUCCSESS',
    DELETE_KINDOFBOOK_FAIL: 'DELETE_KINDOFBOOK_FAIL',

    UPDATE_KINDOFBOOK_SUCCSESS: 'UPDATE_KINDOFBOOK_SUCCSESS',
    UPDATE_KINDOFBOOK_FAIL: 'UPDATE_KINDOFBOOK_FAIL',

    GET_BOOK_ID_SUCCESS: 'GET_BOOK_ID_SUCCESS',
    GET_BOOK_ID_FAIL: 'GET_BOOK_ID_FAIL',

    HOA_DON_SUCCESS: 'HOA_DON_SUCCESS',
    HOA_DON_FAIL:'HOA_DON_FAIL',

    GET_HOA_DON_TT_SUCCESS: 'GET_HOA_DON_TT_SUCCESS',
    GET_HOA_DON_TT_FAIL:'GET_HOA_DON_TT_FAIL',

    CREATE_HOA_DON_TT_SUCCESS: 'CREATE_HOA_DON_TT_SUCCESS',
    CREATE_HOA_DON_TT_FAIL:'CREATE_HOA_DON_TT_FAIL',

    DELLETE_HOA_DON_TT_SUCCESS: 'DELLETE_HOA_DON_TT_SUCCESS',
    DELLETE_HOA_DON_TT_FAIL: 'DELLETE_HOA_DON_TT_FAIL',

    GET_NXB_SUCCESS: 'GET_NXB_SUCCESS',
    GET_NXB_FAIL: 'GET_NXB_FAIL',

    CREATE_NXB_SUCCESS: 'CREATE_NXB_SUCCESS',
    CREATE_NXB_FAIL: 'CREATE_NXB_FAIL',

    DELETE_NXB_SUCCESS: 'DELETE_NXB_SUCCESS',
    DELETE_NXB_FAIL: 'DELETE_NXB_FAIL',

    UPDATE_NXB_SUCCESS: 'UPDATE_NXB_SUCCESS',
    UPDATE_NXB_FAIL: 'UPDATE_NXB_FAIL',

    GET_THE_THANH_VIEN_SUCCESS: 'GET_THE_THANH_VIEN_SUCCESS',
    GET_THE_THANH_VIEN_FAIL: 'GET_THE_THANH_VIEN_FAIL',

    CREATE_THE_THANH_VIEN_SUCCESS: 'CREATE_THE_THANH_VIEN_SUCCESS',
    CREATE_THE_THANH_VIEN_FAIL: 'CREATE_THE_THANH_VIEN_FAIL',

    DELETE_THE_THANH_VIEN_SUCCESS: 'DELETE_THE_THANH_VIEN_SUCCESS',
    DELETE_THE_THANH_VIEN_FAIL: 'DELETE_THE_THANH_VIEN_FAIL',

    CREATE_LIKE_SUCCESS: 'CREATE_LIKE_SUCCESS',
    CRAETE_LIKE_FAIL: 'CRAETE_LIKE_FAIL',

    LOGIN_FACEBOOK_SUCCESS: 'LOGIN_FACEBOOK_SUCCESS',
    LOGIN_FACEBOOK_FAIL: 'LOGIN_FACEBOOK_FAIL',

})

export default actionTypes;
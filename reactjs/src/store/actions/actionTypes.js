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

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAILED: 'FETCH_ALL_USERS_FAILED',

    FETCH_TOP_TEACHER_SUCCESS: 'FETCH_TOP_TEACHER_SUCCESS',
    FETCH_TOP_TEACHER_FAILED: 'FETCH_TOP_TEACHER_FAILED',

    FETCH_ALL_TEACHER_SUCCESS: 'FETCH_ALL_TEACHER_SUCCESS',
    FETCH_ALL_TEACHER_FAILED: 'FETCH_ALL_TEACHER_FAILED',

    SAVE_DETAIL_TEACHER_SUCCESS: 'SAVE_DETAIL_TEACHER_SUCCESS',
    SAVE_DETAIL_TEACHER_FAILED: 'SAVE_DETAIL_TEACHER_FAILED',

    FETCH_ALLCODE_SCHEDULE_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_FAILED: 'FETCH_ALLCODE_SCHEDULE_FAILED',

    FETCH_TEACHER_INFO_START: 'FETCH_TEACHER_INFO_START',
    FETCH_TEACHER_INFO_SUCCESS: 'FETCH_TEACHER_INFO_SUCCESS',
    FETCH_TEACHER_INFO_FAILED: 'FETCH_TEACHER_INFO_FAILED',
})

export default actionTypes;
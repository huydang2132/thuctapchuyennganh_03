import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    userId: {},
    message: '',
    topTeacher: [],
    allTeacher: [],
    scheduleTeacher: [],

    allTeacherInfo: [],

    allCourse: [],
    allCenter: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = []
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = []
            return {
                ...state,
            }
        case actionTypes.FETCH_USERS_BY_ID_SUCCESS:
            state.userId = action.userId
            return {
                ...state,
            }
        case actionTypes.FETCH_USERS_BY_ID_FAILED:
            state.userId = []
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_TEACHER_SUCCESS:
            state.topTeacher = action.dataTeacher
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_TEACHER_FAILED:
            state.topTeacher = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_TEACHER_SUCCESS:
            state.allTeacher = action.allTeacher
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_TEACHER_FAILED:
            state.allTeacher = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS:
            state.scheduleTeacher = action.dataTime
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_FAILED:
            state.scheduleTeacher = []
            return {
                ...state,
            }
        case actionTypes.FETCH_TEACHER_INFO_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_TEACHER_INFO_SUCCESS:
            state.allTeacherInfo = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_TEACHER_INFO_FAILED:
            state.allRequiredTeacherInfo = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_COURSE_SUCCESS:
            state.allCourse = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_COURSE_FAILED:
            state.allCourse = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CENTER_SUCCESS:
            state.allCenter = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CENTER_FAILED:
            state.allCenter = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    dataUser: {},
    roleIdR1: false,
    roleIdR2: false,
    roleIdR3: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                userInfo: action.userInfo,
                isLoggedIn: true,
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.GET_ROLE_ID_SUCCESS:
            return {
                ...state,
                dataUser: action.dataUser,
                roleIdR3: action.dataUser.roleId === 'R3' ? true : false,
            }
        case actionTypes.GET_ROLE_ID_FAILED:
            return {
                ...state,
                dataUser: {}
            }
        default:
            return state;
    }
}

export default appReducer;
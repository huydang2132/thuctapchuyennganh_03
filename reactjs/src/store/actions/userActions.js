import actionTypes from './actionTypes';
import { getRoleIdService } from '../../services/userService';

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})
export const getRoleId = (userInfo) => {
    return async (dispatch, getState) => {
        try {
            let decodeUserInfo = JSON.parse(window.atob(userInfo))
            let res = await getRoleIdService(decodeUserInfo.email);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ROLE_ID_SUCCESS,
                    dataUser: res.data
                });
            }
            else {
                dispatch({
                    type: actionTypes.GET_ROLE_ID_FAILED
                });
            }
        }
        catch (e) {
            dispatch({
                type: actionTypes.GET_ROLE_ID_FAILED
            });
            console.log('getRoleId error', e);
        }
    }
}

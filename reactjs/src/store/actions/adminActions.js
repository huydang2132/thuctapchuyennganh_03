import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService,
    getAllUserService, deleteUserService,
    editUserService, getTopTeacherService,
    getAllTeachers, saveDetailTeacherService
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFailed());
            }
        }
        catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e);
        }
    }

}

export const fetchGenderSuccess = (gender) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: gender
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFailed());
            }
        }
        catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', e);
        }
    }

}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFailed());
            }
        }
        catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e);
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Create a new user success!');
            }
            else {
                dispatch(saveUserFailed());
            }
        }
        catch (e) {
            dispatch(saveUserFailed());
            console.log('createNewUser error', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUserService("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            }
            else {
                dispatch(fetchAllUsersFailed());
            }
        }
        catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersStart error', e);
        }
    }

}

export const fetchAllUsersSuccess = (data, message) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Delete the user success!');
            }
            else {
                toast.error('Delete the user error!');
                dispatch(deleteUserFailed());
            }
        }
        catch (e) {
            dispatch(deleteUserFailed());
            console.log('deleteUser error', e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Edit the user success!');
            }
            else {
                toast.error('Edit the user error!');
                dispatch(editUserFailed());
            }
        }
        catch (e) {
            dispatch(editUserFailed());
            console.log('editUser error', e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopTeacher = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopTeacherService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_TEACHER_SUCCESS,
                    dataTeacher: res.data
                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_TEACHER_FAILED
                });
            }
        }
        catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_TEACHER_FAILED
            });
            console.log('fetchTopTeacher error', e);
        }
    }
}

export const fetchAllTeacher = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTeachers();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_TEACHER_SUCCESS,
                    allTeacher: res.data
                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_TEACHER_FAILED
                });
            }
        }
        catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_TEACHER_FAILED
            });
            console.log('fetchAllTeacher error', e);
        }
    }
}

export const saveDetailTeacher = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailTeacherService(data);
            if (res && res.errCode === 0) {
                toast.success("Save detail teacher success!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_TEACHER_SUCCESS,
                });
            }
            else {
                toast.error("Save detail teacher error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_TEACHER_FAILED
                });
            }
        }
        catch (e) {
            toast.error("Save detail teacher error!");
            dispatch({
                type: actionTypes.SAVE_DETAIL_TEACHER_FAILED
            });
            console.log('saveDetailTeacher error', e);
        }
    }
}

export const fetchScheduleTeacher = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS,
                    dataTime: res.data
                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_FAILED
                });
            }
        }
        catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_FAILED
            });
            console.log('fetchScheduleTeacher error', e);
        }
    }
}

export const getTeacherInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_TEACHER_INFO_START
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data
                }
                dispatch(fetchTeacherInfoSuccess(data));
            }
            else {
                dispatch(fetchTeacherInfoFailed());
            }
        }
        catch (e) {
            dispatch(fetchTeacherInfoFailed());
            console.log('fetchGenderStart error', e);
        }
    }

}

export const fetchTeacherInfoSuccess = (data) => ({
    type: actionTypes.FETCH_TEACHER_INFO_SUCCESS,
    data: data
})

export const fetchTeacherInfoFailed = () => ({
    type: actionTypes.FETCH_TEACHER_INFO_FAILED
})
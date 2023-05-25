import axios from "../axios";

const handleLoginApi = (userEmail, password) => {
    return axios.post('/api/login', { email: userEmail, password: password });
}
const handleRegisterApi = (data) => {
    return axios.post('/api/register', data);
}
const getAllUserService = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}
const getAllCodeService = (type) => {
    return axios.get(`/allcode?type=${type}`);
}
const getTopTeacherService = (limit) => {
    return axios.get(`/api/top-teacher-home?limit=${limit}`);
}
const getAllTeachers = () => {
    return axios.get(`/api/get-all-teachers`);
}
const saveDetailTeacherService = (data) => {
    return axios.post(`/api/save-info-teachers`, data);
}
const getDetailteacherService = (id) => {
    return axios.get(`/api/get-detail-teachers-by-id?id=${id}`);
}
const postScheduleTeacherService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}
const getScheduleTeacherByDateService = (teacherId, date) => {
    return axios.get(`/api/get-schedule-teachers-by-date?teacherId=${teacherId}&date=${date}`);
}
const getExtraInfoTeacherByIdService = (teacherId) => {
    return axios.get(`/api/get-extra-info-teacher-by-id?teacherId=${teacherId}`);
}
const handleChangePasswordService = (data) => {
    return axios.put('/api/account/change-password', data);
}
const getRoleIdService = (email) => {
    return axios.get('/api/get-roleid', { params: { email } });
}
const postNewCourseService = (data) => {
    return axios.post('/api/post-new-course', data);
}
const getAllCourseService = (id) => {
    return axios.get('/api/get-all-course', { params: { id } });
}
const deleteCourseService = (id) => {
    return axios.delete('/api/delete-course', { params: { id } });
}
const editCourseService = (data) => {
    return axios.put('/api/edit-course', data);
}
const getCenterInfoService = (centerId) => {
    return axios.get('/api/get-center-info', { params: { centerId } });
}
const postNewCenterService = (data) => {
    return axios.post('/api/post-new-center', data);
}
const getAllCenterService = (id) => {
    return axios.get('/api/get-all-center', { params: { id } });
}
const deleteCenterService = (id) => {
    return axios.delete('/api/delete-center', { params: { id } });
}
const editCenterService = (data) => {
    return axios.put('/api/edit-center', data);
}
const getTotalService = (id) => {
    return axios.get('/api/get-total', { params: { id } });
}
const getTotalUserByMonthService = (id) => {
    return axios.get('/api/get-total-user-by-month', { params: { id } });
}
export {
    handleLoginApi, handleRegisterApi, getAllUserService,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService,
    getTopTeacherService, getAllTeachers,
    saveDetailTeacherService, getDetailteacherService,
    postScheduleTeacherService, getScheduleTeacherByDateService,
    getExtraInfoTeacherByIdService, handleChangePasswordService,
    getRoleIdService, postNewCourseService, getAllCourseService,
    deleteCourseService, editCourseService, getCenterInfoService,
    postNewCenterService, getAllCenterService, deleteCenterService,
    editCenterService, getTotalService, getTotalUserByMonthService
};
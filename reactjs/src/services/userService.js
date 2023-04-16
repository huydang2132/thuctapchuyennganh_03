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
    return axios.delete('/api-delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (data) => {
    return axios.put('/api-edit-user', data)
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
export {
    handleLoginApi, handleRegisterApi, getAllUserService,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService,
    getTopTeacherService, getAllTeachers,
    saveDetailTeacherService, getDetailteacherService,
    postScheduleTeacherService, getScheduleTeacherByDateService,
    getExtraInfoTeacherByIdService
};
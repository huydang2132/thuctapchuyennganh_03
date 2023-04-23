import express from "express";
import userController from "../controllers/userController";
import teacherController from "../controllers/teacherController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/api/login', userController.handleLogin);
    router.post('/api/register', userController.handleRegister);
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateUser);
    router.put('/api-edit-user', userController.handleEditUser);
    router.delete('/api-delete-user', userController.handleDeleteUser);
    router.get('/allcode', userController.getAllCode);
    router.put('/api/account/change-password', userController.handleChangePassword);
    router.get('/api/get-roleid', userController.getRoleId);

    router.get('/api/top-teacher-home', teacherController.getTopTeacher);
    router.get('/api/get-all-teachers', teacherController.getAllTeacher);
    router.post('/api/save-info-teachers', teacherController.postInfoTeacher);
    router.get('/api/get-detail-teachers-by-id', teacherController.getDetailTeacherById);
    router.post('/api/bulk-create-schedule', teacherController.bulkCreateSchedule);
    router.get('/api/get-schedule-teachers-by-date', teacherController.getScheduleByDate);
    router.get('/api/get-extra-info-teacher-by-id', teacherController.getExtraInfoTeacher);
    router.get('/api/get-profile-teacher-by-id', teacherController.getProfileTeacher);

    return app.use("/", router);
}

module.exports = initWebRoutes

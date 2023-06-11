import express from "express";
import userController from "../controllers/userController";
import teacherController from "../controllers/teacherController";
import adminController from "../controllers/adminController";
import homePageService from "../controllers/homePageController";
import { verifyToken, verifyTokenEmail } from "../middleware/verifyToken";

let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/api/login', userController.handleLogin);
    router.post('/api/register', userController.handleRegister);
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/allcode', userController.getAllCode);
    router.put('/api/account/change-password', userController.handleChangePassword);
    router.get('/api/get-roleid', userController.getRoleId);
    router.get('/api/forgot-password', userController.forgotPassword);
    router.put('/api/reset-password', verifyTokenEmail, userController.resetPassword);

    router.get('/api/validate-token', verifyToken);

    router.get('/api/top-teacher-home', teacherController.getTopTeacher);
    router.get('/api/get-all-teachers', teacherController.getAllTeacher);
    router.post('/api/save-info-teachers', teacherController.postInfoTeacher);
    router.get('/api/get-detail-teachers-by-id', teacherController.getDetailTeacherById);
    router.post('/api/bulk-create-schedule', teacherController.bulkCreateSchedule);
    router.get('/api/get-schedule-teachers-by-date', teacherController.getScheduleByDate);
    router.get('/api/get-extra-info-teacher-by-id', teacherController.getExtraInfoTeacher);
    router.get('/api/get-profile-teacher-by-id', teacherController.getProfileTeacher);
    router.get('/api/get-center-info', teacherController.getCenterInfo);
    router.get('/api/get-all-booking', teacherController.getAllBooking);
    router.put('/api/update-booking', teacherController.updateBooking);

    router.post('/api/post-new-course', adminController.postNewCourse);
    router.get('/api/get-all-course', adminController.getAllCourse);
    router.get('/api/get-all-course-by-teacher', adminController.getAllCourseByTeacher);
    router.put('/api/edit-course', adminController.editCourse);
    router.delete('/api/delete-course', adminController.deleteCourse);
    router.post('/api/post-new-center', adminController.postNewCenter);
    router.get('/api/get-all-center', adminController.getAllCenter);
    router.put('/api/edit-center', adminController.editCenter);
    router.delete('/api/delete-center', adminController.deleteCenter);
    router.get('/api/get-total', adminController.getTotal);
    router.get('/api/get-total-user-by-month', adminController.getTotalUserByMonth);

    router.get('/api/serach-course', homePageService.searchCourse);
    router.post('/api/create-schedule', homePageService.createSchedule);
    router.put('/api/verify-schedule', verifyTokenEmail, homePageService.verifySchedule);
    router.delete('/api/delete-schedule', homePageService.deleteSchedule);
    router.get('/api/get-all-teacher-limit', homePageService.getAllTeacherLimit);

    return app.use("/", router);
}

module.exports = initWebRoutes

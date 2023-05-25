import teacherService from "../services/teacherService";

const getTopTeacher = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }
    try {
        let response = await teacherService.getTopTeacher(+limit);
        return res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
const getAllTeacher = async (req, res) => {
    try {
        let teachers = await teacherService.getAllTeacher();
        return res.status(200).json(teachers)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from servier...'
        })
    }
}
const postInfoTeacher = async (req, res) => {
    try {
        let response = await teacherService.saveInfoTeacher(req.body);
        return res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from servier...'
        })
    }
}
const getDetailTeacherById = async (req, res) => {
    try {
        let info = await teacherService.getDetailTeacherById(req.query.id);
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
const bulkCreateSchedule = async (req, res) => {
    try {
        let info = await teacherService.bulkCreateSchedule(req.body);
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
const getScheduleByDate = async (req, res) => {
    try {
        let info = await teacherService.getScheduleByDate(req.query.teacherId, req.query.date);
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
const getExtraInfoTeacher = async (req, res) => {
    try {
        let info = await teacherService.getExtraInfoTeacher(req.query.teacherId);
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
const getProfileTeacher = async (req, res) => {
    try {
        let info = await teacherService.getProfileTeacher(req.query.teacherId);
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
const getCenterInfo = async (req, res) => {
    try {
        let info = await teacherService.getCenterInfo(req.query.centerId);
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = {
    getTopTeacher: getTopTeacher,
    getAllTeacher: getAllTeacher,
    postInfoTeacher: postInfoTeacher,
    getDetailTeacherById: getDetailTeacherById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInfoTeacher: getExtraInfoTeacher,
    getProfileTeacher: getProfileTeacher,
    getCenterInfo: getCenterInfo,
}
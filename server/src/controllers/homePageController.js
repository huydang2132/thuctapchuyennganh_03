import homePageService from "../services/homePageService";

const searchCourse = async (req, res) => {
    try {
        let info = await homePageService.searchCourse(req.query.name);
        if (info.errCode === 1) {
            return res.status(401).json(info);
        }
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
const createSchedule = async (req, res) => {
    try {
        let info = await homePageService.createSchedule(req.body);
        if (info.errCode === 2) {
            return res.status(401).json(info);
        }
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
const verifySchedule = async (req, res) => {
    try {
        let info = await homePageService.verifySchedule(req.query.id);
        if (info.errCode === 2) {
            return res.status(401).json(info);
        }
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
const deleteSchedule = async (req, res) => {
    try {
        let info = await homePageService.deleteSchedule(req.query.id);
        if (info.errCode === 2) {
            return res.status(401).json(info);
        }
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
const getAllTeacherLimit = async (req, res) => {
    try {
        let info = await homePageService.getAllTeacherLimit(req.query.offset, req.query.limit);
        if (info.errCode === 2) {
            return res.status(401).json(info);
        }
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = {
    searchCourse, createSchedule, verifySchedule,
    deleteSchedule, getAllTeacherLimit
}
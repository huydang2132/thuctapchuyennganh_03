import adminService from "../services/adminService";

const postNewCourse = async (req, res) => {
    try {
        let info = await adminService.postNewCourse(req.body);
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
const getAllCourse = async (req, res) => {
    try {
        let info = await adminService.getAllCourse(req.query.id);
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
const editCourse = async (req, res) => {
    try {
        let info = await adminService.editCourse(req.body);
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
const deleteCourse = async (req, res) => {
    try {
        let info = await adminService.deleteCourse(req.query.id);
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
const postNewCenter = async (req, res) => {
    try {
        let info = await adminService.postNewCenter(req.body);
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
const getAllCenter = async (req, res) => {
    try {
        let info = await adminService.getAllCenter(req.query.id);
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
const editCenter = async (req, res) => {
    try {
        let info = await adminService.editCenter(req.body);
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
const deleteCenter = async (req, res) => {
    try {
        let info = await adminService.deleteCenter(req.query.id);
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
const getTotal = async (req, res) => {
    try {
        let info = await adminService.getTotal(req.query.id);
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
const getTotalUserByMonth = async (req, res) => {
    try {
        let info = await adminService.getTotalUserByMonth(req.query.id);
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
    postNewCourse: postNewCourse,
    getAllCourse: getAllCourse,
    editCourse: editCourse,
    deleteCourse: deleteCourse,
    postNewCenter: postNewCenter,
    getAllCenter: getAllCenter,
    editCenter: editCenter,
    deleteCenter: deleteCenter,
    getTotal: getTotal,
    getTotalUserByMonth: getTotalUserByMonth,
}
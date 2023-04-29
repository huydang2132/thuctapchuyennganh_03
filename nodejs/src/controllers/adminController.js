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
module.exports = {
    postNewCourse: postNewCourse,
    getAllCourse: getAllCourse,
    editCourse: editCourse,
    deleteCourse: deleteCourse,
}
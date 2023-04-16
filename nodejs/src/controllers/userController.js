import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input parameter!'
        })
    }
    else {
        let userData = await userService.handleUserLogin(email, password);
        return res.status(200).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            userInfo: userData.user ? userData.user : {}
        })
    }
}
let handleRegister = async (req, res) => {
    try {
        let info = await userService.handleRegister(req.body);
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
let handleGetAllUser = async (req, res) => {
    let id = req.query.id; //ALL or SINGGLE
    let users = await userService.GetAllUser(id);
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}
let handleCreateUser = async (req, res) => {
    let message = await userService.CreateUser(req.body);
    return res.status(200).json(message)
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.EditUser(data);
    return res.status(200).json(message)
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
        })
    }
    let message = await userService.DeleteUser(req.body.id);
    return res.status(200).json(message)
}
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    }
    catch (e) {
        console.log('Get all code err: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from server'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    handleGetAllUser: handleGetAllUser,
    handleCreateUser: handleCreateUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}
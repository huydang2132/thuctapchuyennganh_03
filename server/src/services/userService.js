import bcrypt from 'bcryptjs';
import db from '../models/index';
import { reject } from 'lodash';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { emailRestPassword } from './emailService';
import generateToken from '../config/generateToken';

dotenv.config();

const salt = bcrypt.genSaltSync(10);
const secretKey = process.env.SECRET_KEY;

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'password', 'roleId'],
                    where: { email: email },
                    raw: true
                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        const payload = {
                            id: user.id,
                            email: user.email,
                            roleId: user.roleId
                            // Các thông tin khác về người dùng có thể được thêm vào payload
                        };
                        // Tạo token với payload và khóa bí mật
                        const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
                        userData.errCode = 0;
                        userData.errMessage = 'Success';
                        delete user.password;
                        userData.user = token;
                        userData.token = token;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found';
                }
            }
            else {
                userData.errCode = 2;
                userData.errMessage = 'User not found';
            }
            resolve(userData);
        }
        catch (e) {
            reject(e);
        }
    })
}
const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (e) {
            reject(e);
        }
    });
}
const GetAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (userId === 'ALL') {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ['password', 'image']
                    },
                    include: [
                        { model: db.Allcode, as: 'roleData', attributes: ['value'] },
                    ],
                    order: [['id', 'ASC'],],
                    raw: true,
                    nest: true
                });
            }
            if (userId && userId !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(user)
        }
        catch (e) {
            reject(e);
        }
    })
}
const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }
        catch (e) {
            reject(e);
        }
    })
}
const handleRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already exists!'
                })
            }
            else {
                let hashPasswordBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    roleId: 'R3'
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Register success'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const handleChangePassword = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.prevPassword || !data.newPassword) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let user = await db.User.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (user) {
                    let check = await bcrypt.compareSync(data.prevPassword, user.password);
                    let hashPasswordBcrypt = await hashUserPassword(data.newPassword);
                    if (check) {
                        user.password = hashPasswordBcrypt;
                        await user.save();
                        resolve({
                            errCode: 0,
                            errMessage: 'Change password success'
                        })
                    }
                    else {
                        resolve({
                            errCode: 2,
                            errMessage: 'Password wrong'
                        })
                    }
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const CreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Email already exists!'
                })
            }
            else {
                let hashPasswordBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: 'Create a new user success'
                });
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const EditUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (!data.id || !data.firstName || !data.lastName || !data.address || !data.phoneNumber) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing parameter"
                })
            }
            else {
                if (user) {
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;
                    user.address = data.address;
                    user.phoneNumber = data.phoneNumber;
                    user.gender = data.gender;
                    user.roleId = data.roleId;
                    user.positionId = data.positionId;
                    if (data.avatar) {
                        user.image = data.avatar
                    }
                    await user.save();
                    resolve({
                        errCode: 0,
                        message: 'Update success!'
                    });
                }
                else {
                    resolve({
                        errCode: 1,
                        message: 'User not found'
                    });
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const DeleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (!user) {
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                })
            }
            await db.User.destroy({
                where: { id: id }
            });
            resolve({
                errCode: 0,
                message: 'Delete success'
            });
        }
        catch (e) {
            reject(e);
        }
    })
}
const getAllCodeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!type) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else {
                let allcode = await db.Allcode.findAll({
                    where: { type: type }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const getRoleIdService = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            if (!email) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'image', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                })
                res.errCode = 0
                res.data = data
                res.errMessage = 'Success...'
                resolve(res);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const forgotPassword = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            if (!email) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.User.findOne({
                    attributes: ['id', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                })
                if (data) {
                    let token = await generateToken.tokenSchedule(data.id)
                    const newPass = Math.floor(Math.random() * 1000000);
                    await emailRestPassword({
                        receiversEmail: email,
                        name: `${data.lastName} ${data.firstName}`,
                        link: `${process.env.LINK_TOKEN_PASSWORD}${token.token}/${data.id}/${newPass}`,
                        newPass: newPass
                    });
                    resolve({
                        errCode: 0,
                        errMessage: 'Success...',
                        data
                    });
                }
                resolve({
                    errCode: 2,
                    errMessage: 'User not found',
                    data
                });
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const resetPassword = (id, newPass) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let user = await db.User.findOne({
                    attributes: ['id', 'password'],
                    where: { id: id },
                    raw: false
                })
                let check = await bcrypt.compareSync(newPass, user.password);
                if (check) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Password is changed'
                    })
                }
                else {
                    let hashPasswordBcrypt = await hashUserPassword(newPass);
                    user.password = hashPasswordBcrypt;
                    await user.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Success...'
                    });
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    handleRegister: handleRegister,
    GetAllUser: GetAllUser,
    CreateUser: CreateUser,
    EditUser: EditUser,
    DeleteUser: DeleteUser,
    getAllCodeService: getAllCodeService,
    handleChangePassword: handleChangePassword,
    getRoleIdService: getRoleIdService,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
}
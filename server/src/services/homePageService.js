import db from '../models/index';
import { Op } from 'sequelize';
import emailService from './emailService';
import generateToken from '../config/generateToken';
require('dotenv').config();

const searchCourse = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (name) {
                let data = await db.Course.findAll({
                    where: {
                        name: {
                            [Op.like]: `${name}%`,
                        }
                    },
                    raw: true
                })
                if (data) {
                    resolve({
                        errCode: 0,
                        errMessage: 'Success...',
                        data
                    })
                }
                else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Course not found...'
                    })
                }
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing parameter'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const createSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.studentId && data.teacherId) {
                const [booking, created] = await db.Booking.findOrCreate({
                    where: { studentId: data.studentId, teacherId: data.teacherId, date: data.date },
                    defaults: {
                        statusId: 'S1',
                        teacherId: data.teacherId,
                        studentId: data.studentId,
                        date: data.date,
                        dateType: data.dateType
                    },
                    raw: true,
                    nest: true
                })
                let idSchedule = booking && booking.dataValues && booking.dataValues.id;
                if (created) {
                    let token = await generateToken.tokenSchedule(idSchedule)
                    await emailService.sendSimpleEmail({
                        receiversEmail: data.email,
                        studentName: data.studentName,
                        phoneNumber: data.phoneNumber,
                        address: data.address,
                        teacherName: data.teacherName,
                        schedule: data.schedule,
                        price: data.price,
                        link: `${process.env.LINK_TOKEN_BOOKING}${token.token}/${idSchedule}`
                    });
                    resolve({
                        errCode: 0,
                        errMessage: 'Success...',
                    })
                }
                else if (booking) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Schedule exists'
                    })
                }
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing parameter'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const verifySchedule = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                let schedule = await db.Booking.findOne({
                    where: { id: id, statusId: 'S1' },
                    raw: false
                });
                if (schedule) {
                    schedule.statusId = 'S2';
                    await schedule.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Success...'
                    })
                }
                else {
                    let scheduleConfirm = await db.Booking.findOne({
                        where: { id: id, statusId: 'S2' },
                        raw: false
                    });
                    if (scheduleConfirm) {
                        resolve({
                            errCode: 3,
                            errMessage: 'Schedule confirmed'
                        })
                    }
                    resolve({
                        errCode: 1,
                        errMessage: 'Schedule not found'
                    })
                }
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing parameter'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const deleteSchedule = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                let schedule = await db.Booking.findOne({
                    where: { id: id, statusId: 'S1' },
                });
                if (schedule) {
                    await db.Booking.destroy({
                        where: { id: id, statusId: 'S1' },
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Success...'
                    })
                }
                else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Schedule not found'
                    })
                }
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing parameter'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const getAllTeacherLimit = (offset, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            data.count = await db.User.count({
                where: { roleId: 'R2' }
            })
            if (offset && limit) {
                const offsetInt = parseInt(offset, 10);
                const limitInt = parseInt(limit, 10);
                data.teacher = await db.User.findAll({
                    where: { roleId: 'R2' },
                    offset: offsetInt,
                    limit: limitInt,
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['value'] },
                    ],
                    raw: true,
                    nest: true
                });
                if (data) {
                    resolve({
                        errCode: 0,
                        errMessage: 'Success...',
                        data
                    })
                }
                else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Teacher not found'
                    })
                }
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing parameter'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    searchCourse, createSchedule, verifySchedule,
    deleteSchedule, getAllTeacherLimit
}
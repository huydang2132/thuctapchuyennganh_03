import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
import { json } from 'body-parser';
import sequelize from 'sequelize';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopTeacher = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['value'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['value'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: user
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
let getAllTeacher = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let teachers = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errCode: 0,
                data: teachers
            });
        }
        catch (e) {
            reject(e);
        }
    })
}
let saveInfoTeacher = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.teacherId || !data.description ||
                !data.selectedPrice || !data.selectedPayment ||
                !data.selectedCenter || !data.note) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
            else {
                //Teacher info
                let teacherInfo = await db.Teacher_info.findOne({
                    where: { teacherId: data.teacherId, },
                    raw: false
                })
                if (teacherInfo) {
                    teacherInfo.priceId = data.selectedPrice;
                    teacherInfo.description = data.description;
                    teacherInfo.paymentId = data.selectedPayment;
                    teacherInfo.centerId = data.selectedCenter;
                    teacherInfo.note = data.note;
                    await teacherInfo.save();
                }
                else {
                    await db.Teacher_info.create({
                        priceId: data.selectedPrice,
                        teacherId: data.teacherId,
                        description: data.description,
                        paymentId: data.selectedPayment,
                        centerId: data.selectedCenter,
                        note: data.note,
                    })
                }
                resolve({
                    errCode: 0,
                    errMesage: 'Save info teacher success'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let getDetailTeacherById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing require parameter'
                })
            }
            else {
                let data = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Teacher_info,
                            attributes: {
                                exclude: ['id', 'teacherId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['value'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['value'] },
                                {
                                    model: db.Center, attributes: ['name', 'provinceId'],
                                    include: [
                                        { model: db.Allcode, as: 'provinceData', attributes: ['value'] },
                                    ],
                                },

                            ],
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['value'] },
                    ],
                    raw: true,
                    nest: true
                })
                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }
                if (!data) {
                    data: { }
                }
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const getCenterInfo = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
            else {
                if (id === 'ALL') {
                    let data = await db.Center.findAll({
                        attributes: ['id', 'name'],
                        include: [
                            { model: db.Allcode, as: 'provinceData', attributes: ['value'] },
                        ],
                        raw: true,
                        nest: true
                    })
                    resolve({
                        errCode: 0,
                        errMesage: 'Success...',
                        data: data
                    })
                }
                else {
                    let data = await db.Center.findOne({
                        where: { id: id },
                        include: [
                            { model: db.Allcode, as: 'provinceData', attributes: ['value'] },
                        ],
                        raw: true,
                        nest: true
                    })
                    resolve({
                        errCode: 0,
                        errMesage: 'Success...',
                        data: data
                    })
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.teacherId || !data.date) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
            else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                let existing = await db.Schedule.findAll({
                    where: { teacherId: data.teacherId, date: data.date.toString() },
                    attributes: ['dateType', 'date', 'teacherId', 'maxNumber'],
                    raw: true
                });
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.dateType === b.dateType && a.date === b.date;
                })

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                    resolve({
                        errCode: 0,
                        errMesage: 'Success'
                    });
                }
                else {
                    resolve({
                        errCode: 2,
                        errMesage: 'Exsist schedule'
                    })
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let getScheduleByDate = (teacherId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!teacherId || !date) {
                resolve({
                    errCode: 1,
                    errCode: 'Missing required parameter'
                })
            }
            else {
                let data = await db.Schedule.findAll({
                    where: {
                        teacherId: teacherId,
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'dateTypeData', attributes: ['value'] }
                    ],
                    raw: true,
                    nest: true
                })
                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let getExtraInfoTeacher = (teacherId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!teacherId) {
                resolve({
                    errCode: 1,
                    errCode: 'Missing required parameter'
                })
            }
            else {
                let data = await db.Teacher_info.findOne({
                    where: {
                        teacherId: teacherId
                    },
                    attributes: {
                        exclude: ['id', 'teacherId']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['value'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['value'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let getProfileTeacher = (teacherId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!teacherId) {
                resolve({
                    errCode: 1,
                    errCode: 'Missing required parameter'
                })
            }
            else {
                let data = await db.User.findOne({
                    where: { id: teacherId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Teacher_info,
                            attributes: {
                                exclude: ['id', 'teacherId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['value', ''] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['value', ''] },
                            ]
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['value', ''] }
                    ],
                    raw: true,
                    nest: true
                })
                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }
                if (!data) {
                    data: { }
                }
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let getAllBooking = (teacherId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (teacherId) {
                let data = await db.Booking.findAll({
                    where: { teacherId },
                    include: [
                        { model: db.User, attributes: ['firstName', 'lastName', 'email', 'address'] },
                        { model: db.Allcode, as: 'statusData', attributes: ['value'] },
                        { model: db.Allcode, as: 'dateTypeBookingData', attributes: ['value'] },
                    ],
                    raw: true,
                    nest: true
                });
                if (data) {
                    resolve({
                        errCode: 0,
                        errMesage: 'Success...',
                        data
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMesage: 'Booking is empty'
                    })
                }
            }
            else {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let updateBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id && data.statusId) {
                let Schedule = await db.Booking.findOne({
                    where: { id: data.id },
                    raw: false
                });
                if (Schedule) {
                    if (Schedule.statusId !== data.statusId) {
                        Schedule.statusId = data.statusId;
                        await Schedule.save();
                        resolve({
                            errCode: 0,
                            errMesage: 'Success...',
                        })
                    }
                }
                else {
                    resolve({
                        errCode: 2,
                        errMesage: 'Booking not found'
                    })
                }
            }
            else {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getTopTeacher: getTopTeacher,
    getAllTeacher: getAllTeacher,
    saveInfoTeacher: saveInfoTeacher,
    getDetailTeacherById: getDetailTeacherById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInfoTeacher: getExtraInfoTeacher,
    getProfileTeacher: getProfileTeacher,
    getCenterInfo: getCenterInfo,
    getAllBooking: getAllBooking,
    updateBooking: updateBooking
}
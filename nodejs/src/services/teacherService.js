import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
import { json } from 'body-parser';

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
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
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
            if (!data.teacherId || !data.contentHTML || !data.contentMarkdown || !data.action ||
                !data.selectedPrice || !data.selectedPayment || !data.selectedProvince ||
                !data.nameCenter || !data.addressCenter || !data.note) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
            else {
                //Mark down
                if (data.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        teacherId: data.teacherId
                    })
                }
                else if (data.action === 'EDIT') {
                    let teacherMarkdown = await db.Markdown.findOne({
                        where: { teacherId: data.teacherId },
                        raw: false
                    })
                    if (teacherMarkdown) {
                        teacherMarkdown.contentHTML = data.contentHTML;
                        teacherMarkdown.contentMarkdown = data.contentMarkdown;
                        teacherMarkdown.description = data.description;
                        await teacherMarkdown.save();
                    }
                }
                //Teacher info
                let teacherInfo = await db.Teacher_Info.findOne({
                    where: { teacherId: data.teacherId, },
                    raw: false
                })
                if (teacherInfo) {
                    teacherInfo.priceId = data.selectedPrice;
                    teacherInfo.paymentId = data.selectedPayment;
                    teacherInfo.provinceId = data.selectedProvince;
                    teacherInfo.nameCenter = data.nameCenter;
                    teacherInfo.addressCenter = data.addressCenter;
                    teacherInfo.note = data.note;
                    await teacherInfo.save();
                }
                else {
                    await db.Teacher_Info.create({
                        teacherId: data.teacherId,
                        priceId: data.selectedPrice,
                        paymentId: data.selectedPayment,
                        provinceId: data.selectedProvince,
                        nameCenter: data.nameCenter,
                        addressCenter: data.addressCenter,
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
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        {
                            model: db.Teacher_Info,
                            attributes: {
                                exclude: ['id', 'teacherId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'provinceData', attributes: ['valueVi', 'valueEn'] }
                            ]
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] }
                    ],
                    raw: true,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
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
let bulkCreateSchedule = (data) => {
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
                    where: { teacherId: data.teacherId, date: data.date },
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
                        { model: db.Allcode, as: 'dateTypeData', attributes: ['valueVi', 'valueEn'] }
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
                let data = await db.Teacher_Info.findOne({
                    where: {
                        teacherId: teacherId
                    },
                    attributes: {
                        exclude: ['id', 'teacherId']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'provinceData', attributes: ['valueVi', 'valueEn'] }
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
                            model: db.Teacher_Info,
                            attributes: {
                                exclude: ['id', 'teacherId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'provinceData', attributes: ['valueVi', 'valueEn'] }
                            ]
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] }
                    ],
                    raw: true,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
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
module.exports = {
    getTopTeacher: getTopTeacher,
    getAllTeacher: getAllTeacher,
    saveInfoTeacher: saveInfoTeacher,
    getDetailTeacherById: getDetailTeacherById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInfoTeacher: getExtraInfoTeacher,
    getProfileTeacher: getProfileTeacher,
}
import db from '../models/index';
import sequelize from 'sequelize';

const postNewCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
            else {
                let link = await db.Course.findOne({
                    where: { listId: data.listId }
                })
                if (link) {
                    resolve({
                        errCode: 2,
                        errMesage: 'Course already exists'
                    })
                }
                else {
                    await db.Course.create({
                        name: data.name,
                        listId: data.listId,
                        teacherId: data.teacherId
                    })
                    resolve({
                        errCode: 0,
                        errMesage: 'Success...'
                    })
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

const getAllCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
            else {
                let data = {}
                if (id === 'ALL') {
                    data = await db.Course.findAll({
                        include: [
                            {
                                model: db.User, attributes: ['firstName', 'lastName'],
                                include: [
                                    { model: db.Allcode, as: 'positionData', attributes: ['value'] },
                                ],
                            }
                        ],
                        order: [['id', 'ASC'],],
                        raw: true,
                        nest: true
                    });
                }
                else {
                    data = await db.Course.findOne({
                        where: { id: id },
                        include: [
                            {
                                model: db.User, attributes: ['firstName', 'lastName'],
                                include: [
                                    { model: db.Allcode, as: 'positionData', attributes: ['value'] },
                                ],
                            }
                        ],
                        raw: true,
                        nest: true
                    })
                }
                resolve({
                    errCode: 0,
                    errMesage: 'Success...',
                    data
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const getAllCourseByTeacher = (teacherId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!teacherId) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
            else {
                let data = {}
                data = await db.Course.findAll({
                    where: { teacherId: teacherId },
                    include: [
                        {
                            model: db.User, attributes: ['firstName', 'lastName'],
                            include: [
                                { model: db.Allcode, as: 'positionData', attributes: ['value'] },
                            ],
                        }
                    ],
                    order: [['id', 'ASC'],],
                    raw: true,
                    nest: true
                });
                resolve({
                    errCode: 0,
                    errMesage: 'Success...',
                    data
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const deleteCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
            else {
                let res = await db.Course.findOne({
                    where: { id: id }
                })
                if (!res) {
                    resolve({
                        errCode: 2,
                        errMesage: 'Course not found'
                    })
                }
                else {
                    await db.Course.destroy({
                        where: { id: id }
                    })
                    resolve({
                        errCode: 0,
                        errMesage: 'Success...'
                    })
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const editCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.listId) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
            else {
                let course = await db.Course.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (course) {
                    course.name = data.name;
                    course.listId = data.listId;
                    await course.save();
                    resolve({
                        errCode: 0,
                        errMesage: 'Success...'
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMesage: 'Course not found'
                    })
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const postNewCenter = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.provinceId || !data.address || !data.name) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter'
                })
            }
            else {
                let center = await db.Center.findOne({
                    where: {
                        name: data.name,
                        provinceId: data.provinceId
                    }
                })
                if (center) {
                    resolve({
                        errCode: 2,
                        errMesage: 'Center already exists!'
                    })
                }
                else {
                    await db.Center.create({
                        name: data.name,
                        provinceId: data.provinceId,
                        address: data.address,
                        description: data.description,
                        image: data.image
                    })
                    resolve({
                        errCode: 0,
                        errMesage: 'Success...'
                    })
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const getAllCenter = (id, offset, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter...'
                })
            }
            else {
                let data = {};
                if (id === 'ALL') {
                    const offsetInt = parseInt(offset, 10);
                    const limitInt = parseInt(limit, 10);
                    data = await db.Center.findAll({
                        offset: offsetInt,
                        limit: limitInt,
                        include: [
                            { model: db.Allcode, as: 'provinceData', attributes: ['value'] },
                        ],
                        order: [['id', 'ASC'],],
                        raw: true,
                        nest: true
                    });
                }
                else {
                    data = await db.Center.findOne({
                        where: { id: id },
                        include: [
                            { model: db.AllCode, as: 'provinceData', attributes: ['value'] },
                        ],
                        raw: true,
                        nest: true
                    })
                }
                resolve({
                    errCode: 0,
                    errMesage: 'Success...',
                    data: data
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const editCenter = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter...'
                })
            }
            else {
                let center = await db.Center.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (center) {
                    center.name = data.name;
                    center.provinceId = data.provinceId;
                    center.address = data.address;
                    center.description = data.description;
                    if (data.image) {
                        center.image = data.image;
                    }
                    await center.save();
                    resolve({
                        errCode: 0,
                        errMesage: 'Success...'
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMesage: 'Center not found'
                    })
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const deleteCenter = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter...'
                })
            }
            else {
                let center = await db.Center.findOne({
                    where: { id: id }
                })
                if (center) {
                    await db.Center.destroy({
                        where: { id: id }
                    })
                    resolve({
                        errCode: 0,
                        errMesage: 'Success...'
                    })
                }
                else {
                    resolve({
                        errCode: 3,
                        errMesage: 'Not found'
                    })
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const getTotal = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameter...'
                })
            }
            else {
                let total = 0;
                if (id === 'Center') {
                    total = await db.Center.count();
                }
                else if (id === 'User') {
                    total = await db.User.count();
                }
                else if (id === 'Course') {
                    total = await db.Course.count();
                }
                resolve({
                    errCode: 0,
                    errMesage: 'Success...',
                    total: total
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}


const getTotalUserByMonth = async (id) => {
    try {
        if (!id) {
            return {
                errCode: 1,
                errMessage: "Missing parameter...",
            };
        } else {
            const dataUser = await db.User.findAll({
                where: {
                    roleId: id,
                },
                attributes: [
                    [
                        sequelize.fn("COUNT", sequelize.col("id")),
                        "userCount",
                    ],
                    [
                        sequelize.literal("EXTRACT(MONTH FROM \"createdAt\")"),
                        "month",
                    ],
                ],
                group: [
                    sequelize.literal("EXTRACT(MONTH FROM \"createdAt\")"),
                ],
            });

            if (dataUser.length > 0) {
                return {
                    errCode: 0,
                    errMessage: "Success...",
                    dataUser,
                };
            } else {
                return {
                    errCode: 3,
                    errMessage: "Not found",
                    dataUser: [],
                };
            }
        }
    } catch (e) {
        throw e;
    }
};
module.exports = {
    postNewCourse: postNewCourse,
    getAllCourse: getAllCourse,
    getAllCourseByTeacher: getAllCourseByTeacher,
    editCourse: editCourse,
    deleteCourse: deleteCourse,
    postNewCenter: postNewCenter,
    getAllCenter: getAllCenter,
    editCenter: editCenter,
    deleteCenter: deleteCenter,
    getTotal: getTotal,
    getTotalUserByMonth: getTotalUserByMonth
}
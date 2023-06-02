import db from '../models/index';
import { Op } from 'sequelize';

let searchCourse = (name) => {
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

module.exports = {
    searchCourse
}
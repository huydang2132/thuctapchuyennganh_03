require('dotenv').config();
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

const tokenSchedule = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = {
                id
                // Các thông tin khác về người dùng có thể được thêm vào payload
            };
            // Tạo token với payload và khóa bí mật
            const token = jwt.sign(payload, secretKey, { expiresIn: '5m' });
            resolve({
                errCode: 0,
                errMessage: 'Success...',
                token
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    tokenSchedule
}
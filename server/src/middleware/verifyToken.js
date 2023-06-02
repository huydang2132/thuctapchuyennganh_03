import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    let authorization = req.headers['authorization'];
    let token = authorization && authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    errCode: 1,
                    errMessage: 'Token expired or invalid',
                })
            }
            else {
                next();
                return res.status(200).json({
                    errCode: 0,
                    errMessage: 'Success',
                    dataUser: decoded
                })
            }
        });
    }
    else {
        res.status(401).json({
            errCode: 401,
            errMessage: 'Token not provided'
        });
    }
}
const verifyRoleAdmin = (req, res, next) => {
    let authorization = req.headers['authorization'];
    let token = authorization && authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err)
            res.status(401).json({
                errCode: 1,
                errMessage: 'Token expired or invalid',
            })
        }
        else {
            if (decoded && decoded.roleId === 'R1') {
                next();
            }
            else {
                res.status(401).json({
                    errCode: 2,
                    errMessage: 'Token invalid',
                })
            }
        }
        console.log(decoded);
    });

}
module.exports = {
    verifyToken, verifyRoleAdmin
}
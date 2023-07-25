require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Phần mềm giáo dục điện tử - Education" <gotenks2132@gmail.com>', // sender address
        to: dataSend.receiversEmail, // list of receivers
        subject: "Thông tin đăng ký lịch học", // Subject line
        html: `
        <h3>Xin chào ${dataSend.studentName}!</h3>
        <p>Chúng tôi gửi email này để xác nhận một số thông tin về việc đăng ký lịch học trên website Education của chúng tôi. 
        <br/>Xin vui lòng xác nhận rằng các thông tin sau là chính xác!</p>
        <p style="font-size: 16px;
        font-weight: 600">Thông tin học viên:</p>
        <span>
        1. Họ và tên: ${dataSend.studentName}<br/>
        2. Số điện thoại: ${dataSend.phoneNumber}<br/>
        3. Địa chỉ: ${dataSend.address}
        </span>
        <p style="font-size: 16px;
        font-weight: 600">Thông tin giáo viên:</p>
        <span>
        1. Họ và tên: ${dataSend.teacherName}<br/>
        2. Lịch giảng dạy: <b>${dataSend.schedule}</b><br/>
        3. Học phí: ${new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(dataSend.price)}
        </span>
        <p>Xin vui lòng kiểm tra thông tin trên và thông báo cho chúng tôi ngay nếu có bất kỳ sai sót nào hoặc cung cấp các thông tin bổ sung nếu cần thiết.</p>
        <p>Nếu các thông tin đã chính xác. Vui lòng kích vào nút bên dưới để xác nhận! Link xác nhận sẽ hết hạn sau 5 phút</p><br/>
        <div>
        <a href=${dataSend.link} target="_blank" style="background-color: #16e60b;
            color: #fff;
            text-decoration: none;
            padding: 20px 50px;
            border-radius: 5px;
            font-size: 20px;
            font-weight: 600;">Xác nhận!</a>
        </div><br/>
        <p>Trân trọng</p>
        `, // html body
    });
}
let emailRestPassword = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Phần mềm giáo dục điện tử - Education" <gotenks2132@gmail.com>', // sender address
        to: dataSend.receiversEmail, // list of receivers
        subject: "Đặt lại mật khẩu", // Subject line
        html: `
        <h3>Xin chào ${dataSend.name}!</h3>
        <p>Bấm vào nút phía dưới để đặt lại mật khẩu!</p>
        <p>Mật khẩu sau khi đặt lại của bạn là: ${dataSend.newPass}</p>
        <p>Link xác nhận sẽ hết hạn sau 5 phút</p><br/>
        <div>
        <a href=${dataSend.link} target="_blank" style="background-color: #16e60b;
            color: #fff;
            text-decoration: none;
            padding: 20px 50px;
            border-radius: 5px;
            font-size: 20px;
            font-weight: 600;">Xác nhận!</a>
        </div><br/>
        `, // html body
    });
}
module.exports = {
    sendSimpleEmail, emailRestPassword
}
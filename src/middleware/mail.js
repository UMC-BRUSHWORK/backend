import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// BW 계정에 보내는 메일
export const sendMailToBW = (data) => {
    // data - 신고 사유
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: '[BRUSHWORK] 신고 메일',
        text: data.context
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) console.error(error);
        console.log(info);
    })
}

// 사용자에게 보내는 메일 (신고 메일 답장? - 혹시 몰라서 만들어 놓음)
export const sendMailToUser = (data, userEmail) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'nodemailer TEST 메일',
        text: '노드 패키지 nodemailer을 통해 보낸 메일'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) console.error(error);
        console.log(info);
    })
}
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import moment from 'moment';

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
    const reportDate = moment.utc(data.created_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: '[BRUSHWORK] 신고 메일 #' + data.complaint_id,
        html:
        "<ul>"+
            "<li>신고번호: "+ data.complaint_id +"</li>"+
            "<li>신고일시: "+ reportDate +"</li>"+
            "<li>신고대상: "+ data.reporteeName +"</li>"+
            "<li>신고자: "+ data.reporterName +"</li>"+
            "<li>신고사유: "+ data.complaint_context +"</li>"+
        "</ul>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {console.error(error);}
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
import AWS from 'aws-sdk'
import multer from 'multer';
import multerS3 from 'multer-s3';

import { createUUID } from './uuid.js';

import path from 'path';
import dotenv from 'dotenv';

import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

dotenv.config();    // .env 파일 사용

const s3 = new AWS.S3({
    region: "ap-northeast-2",
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY
});

// 확장자 검사 목록
const allowedExtensions =  ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

export const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, callback) => {
            const uploadDirectory = req.query.directory ?? '';  // 디렉토리 path 설정을 위해서
            const extension = path.extname(file.originalname);  // 파일 이름 얻어오기
            const uuid = createUUID();
            // extension 확인을 위한 코드 (확장자 검사용!)
            console.log(file);
            if(!allowedExtensions.includes(extension)){
                return callback(new BaseError(status.WRONG_EXTENSION));
            }
            callback(null, `${uploadDirectory}/${uuid}_${file.originalname}`)
        },
        acl: 'public-read-write'
    }),
    // 이미지 용량 제한 (20MB)
    limits: { fileSize: 20 * 1024 * 1024},
});
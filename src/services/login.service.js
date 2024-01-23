const jwt = require('jsonwebtoken');
const loginDao = require('../models/login.dao');
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.SECRET_KEY;
const ALGORITHM = 'HS256';
const EXPIRATION_TIME = '15m';
const ISSUER = 'malibu';
const saltRounds = 10;

export const loginUser = async(userEmail, password) => {
    console.log('2-1');
    try {
        const result = await loginDao.getUserByEmail(userEmail);
        

        if (result.length > 0) {
            const user = result[0];
            const hashedPassword = await bcrypt.hash(user.user_password, saltRounds);

            console.log("password : " + password + " end");
            console.log("user.user_password : " + user.user_password + " end");


            const isPasswordMatch = await comparePassword(password, hashedPassword);
            console.log('isPasswordMatch : ' + isPasswordMatch);
            if (isPasswordMatch) {
                //비밀번호가 일치함
                const user_nickname = user.user_nickname;
                const token = generateToken(user_nickname);
                console.log('2-4');
                console.log(token);
                // 콜백 대신 직접 결과 반환
                return { token };
            } else {
                //비밀번호가 일치하지 않음
                console.log('2-5');
                // 콜백 대신 직접 결과 반환
                return null;
            }
        } else {
            //쿼리가 작동하지 않음
            console.log('2-6');
            // 콜백 대신 직접 결과 반환
            return null;
        }
    } catch (err) {
        //뭔가 에러가 남
        console.error('2-2', err);
        // 콜백 대신 에러 던지기
        throw err;
    }
};

const generateToken = (user_nickname) => {
    try {
        const token = jwt.sign(
            {
                type: 'JWT',
                user_nickname: user_nickname,
            },
            SECRET_KEY,
            {
                algorithm: ALGORITHM,
                expiresIn: EXPIRATION_TIME,
                issuer: ISSUER,
            }
        );
        return token;
    } catch (error) {
        // Handle JWT signing error
        console.error('Error generating token:', error);
        throw error;
    }
};

const comparePassword = async (inputPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
};
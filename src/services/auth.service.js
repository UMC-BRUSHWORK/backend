import bcrypt from 'bcrypt';

import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

import { generateToken } from '../middleware/jwt';
import { comparePassword, maskEmail } from '../middleware/auth';

import { getUserByEmail, updateAccess, getUserByName, getUserByEmailAndName } from '../models/auth.dao';
import { loginResponseDTO } from '../dtos/auth.dto';

export const loginUser = async(body) => {

    const { user_email, user_password } = body;

    const user_db = await getUserByEmail(user_email);   // 사용자 존재하는지 확인
    if (user_db.length > 0) {
        const user = user_db[0];
        const hashedPassword = await bcrypt.hash(user.user_password, 10);
        const isPasswordMatch = await comparePassword(user_password, hashedPassword);

        if (isPasswordMatch) {      // 비밀번호 일치
            const token = generateToken(user.user_nickname);
            const result = await updateAccess(user.user_id);
            // 콜백 대신 직접 결과 반환
            return loginResponseDTO(result, token);
        } else {    //비밀번호가 일치하지 않음
            // 콜백 대신 직접 결과 반환
            throw new BaseError(status.LOGIN_PASSWORD_WRONG);
        }
    } else {    //쿼리가 작동하지 않음
        console.log('2-6');
        // 콜백 대신 직접 결과 반환
        throw new BaseError(status.LOGIN_PARAM_NOT_EXIST);
    }
}

export const findEmail = async(body) => {
    const {user_name} = body;

    const check_db = await getUserByName(user_name);
    if (check_db.length > 0){
        const user = check_db[0];
        const useremail = user.user_email;
        const maskedEmail = maskEmail(useremail);
        return maskedEmail;
    }

}

export const changePassword = async(body) => {
    const {user_email, user_name } = body;
    const afterpassword = body.a_password;

    const hashedAfterPassword = await bcrypt.hash(afterpassword, 10);

    const check_db = await getUserByEmailAndName(hashedAfterPassword, user_email, user_name);
    if(check_db){
        return check_db
    }else{
        throw new BaseError 
    }
}
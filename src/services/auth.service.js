import bcrypt from 'bcrypt';

import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

import { generateToken } from '../middleware/jwt';
import { comparePassword } from '../middleware/auth';

import { getUserByEmail, updateAccess } from '../models/auth.dao';
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

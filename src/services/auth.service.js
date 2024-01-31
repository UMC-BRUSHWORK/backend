import bcrypt from 'bcrypt';

import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

import { generateToken } from '../middleware/jwt';
import { comparePassword, maskEmail } from '../middleware/auth';



import { changeStatusByEmail, createUser, getUserByEmail, getUserByNickname, getUserByPhone, updateAccess, getUserByEmailAndName } from '../models/auth.dao';
import { findEmailResponseDTO, loginResponseDTO, registerResponseDTO, resignResponseDTO } from '../dtos/auth.dto';


// 로그인
export const loginUser = async(body) => {

    const { user_email, user_password } = body;

    const user_db = await getUserByEmail(user_email);   // 사용자 존재하는지 확인
    if (user_db.length > 0) {
        const user = user_db[0];
        const isPasswordMatch = await comparePassword(user_password, user.user_password);

        if (isPasswordMatch) {      // 비밀번호 일치
            const token = generateToken(user.user_nickname);
            const result = await updateAccess(user.user_id);
            // 콜백 대신 직접 결과 반환
            return loginResponseDTO(result, token);
        } else {    //비밀번호가 일치하지 않음
            // 콜백 대신 직접 결과 반환
            throw new BaseError(status.PASSWORD_WRONG);
        }
    } else {    //쿼리가 작동하지 않음
        // 콜백 대신 직접 결과 반환
        throw new BaseError(status.LOGIN_PARAM_NOT_EXIST);
    }
}

// 회원가입 -> DB 비밀번호 암호화
export const registerService = async (body) => {

    const {user_email, user_password, user_nickname, user_name, user_phone} = body;

    const CN = await getUserByNickname(user_nickname);  // 닉네임이 아니라 본명을 따져야 하지 않을까 생각..!
    const CE = await getUserByEmail(user_email);
    const hashedPassword = await bcrypt.hash(user_password, 10);

    console.log(CN);
    console.log(CE);

    if(CN.length){
        //이미 사용 중인 닉네임입니다.
        throw new BaseError(status.NICKNAME_ALREADY_EXIST);
    }

    if(CE.length){
        //이미 등록된 이메일 주소 입니다.
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }

    const result = await createUser(user_email, hashedPassword, user_name, user_nickname, user_phone);

    return registerResponseDTO(result);
}

// 회원 탈퇴
export const resignService = async (body) => {

    const {user_email, user_password} = body;
    const user_db = await getUserByEmail(user_email);

    if(user_db.length > 0){
        const user = user_db[0];
        const isPasswordMatch = await comparePassword(user_password, user.user_password);

        if(isPasswordMatch){
            //비밀번호가 일치, 인증완료 삭제 쿼리
            await changeStatusByEmail(user_email);
            const result = await getUserByEmail(user_email);

            return resignResponseDTO(result[0]);
        }else{
            //비밀번호가 일치하지 않아 회원을 삭제할 수 없습니다!
            throw new BaseError(status.PASSWORD_WRONG);
        }
    }else{
        throw new BaseError(status.MEMBER_NOT_FOUND);
    }    
}

// email 찾기
export const findEmail = async (body) => {
    const {user_phone} = body;
    const check_db = await getUserByPhone(user_phone);
    
    if (check_db.length > 0){
        const user = check_db[0];
        const useremail = user.user_email;
        const maskedEmail = await maskEmail(useremail);
        return findEmailResponseDTO(maskedEmail);
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

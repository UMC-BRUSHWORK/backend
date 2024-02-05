import bcrypt from 'bcrypt';

import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

import { generateToken } from '../middleware/jwt';
import { comparePassword, maskEmail } from '../middleware/auth';


import { changeStatusByEmail, createUser, getUserByEmail, getUserByName, getUserByNickname, getUserByPhone, updateAccess, getUserByEmailAndName, changeSleepUser, changeActiveUser } from '../models/auth.dao';
import { findEmailResponseDTO, loginResponseDTO, registerResponseDTO, resignResponseDTO, inLoginsleepUserResponseDTO, sleepUserResponseDTO } from '../dtos/auth.dto';


// 로그인
export const loginUser = async (body) => {
    const { userEmail, userPassword } = body;

    const user_db = await getUserByEmail(userEmail);   // 사용자 존재하는지 확인
    if (user_db.length > 0) {
        const user = user_db[0];
        const isPasswordMatch = await comparePassword(userPassword, user.user_password);
        if (isPasswordMatch) {  // 비밀번호 일치
            const lastLoginDate = new Date(user.access_at);
            const currentDate = new Date();
            const checkDate = currentDate - lastLoginDate;
            
            if(checkDate >= 365 * 24 * 60 * 60 * 1000){
                //휴먼 계정
                await changeSleepUser(user) //유저 상태 전환
                return inLoginsleepUserResponseDTO(user)
            } else {
                //정상 계정 토큰 발급 진행
                const token = generateToken(user.user_nickname);
                const result = await updateAccess(user.user_id);
                // 콜백 대신 직접 결과 반환
                return loginResponseDTO(result, token);
            }
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

    const {userEmail, userPassword, userNickname, userName, userPhone} = body;

    const CN = await getUserByNickname(userNickname);  // 닉네임이 아니라 본명을 따져야 하지 않을까 생각..!
    const CE = await getUserByEmail(userEmail);
    const hashedPassword = await bcrypt.hash(userPassword, 10);


    if(CN.length){
        //이미 사용 중인 닉네임입니다.
        throw new BaseError(status.NICKNAME_ALREADY_EXIST);
    }

    if(CE.length){
        //이미 등록된 이메일 주소 입니다.
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }

    const result = await createUser(userEmail, hashedPassword, userName, userNickname, userPhone);

    return registerResponseDTO(result);
}

// 회원 탈퇴
export const resignService = async (body) => {
    const {userEmail, userPassword} = body;
    const user_db = await getUserByEmail(userEmail);

    if(user_db.length > 0){
        const user = user_db[0];
        const isPasswordMatch = await comparePassword(userPassword, user.user_password);

        if(isPasswordMatch){
            //비밀번호가 일치, 인증완료 삭제 쿼리
            await changeStatusByEmail(userEmail);
            const result = await getUserByEmail(userEmail);


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
    const {userPhone} = body;
    const check_db = await getUserByPhone(userPhone);
    
    if (check_db.length > 0){
        const user = check_db[0];
        const useremail = user.user_email;
        const maskedEmail = await maskEmail(useremail);
        return findEmailResponseDTO(maskedEmail);
    }
}

//비밀번호 변경
export const changePassword = async(body) => {
    const {useremail, username } = body;
    const beforePassword = body.bpassword;  //현재 비밀번호
    const afterPassword = body.apassword;   //변경할 비밀번호

    const hashedAfterPassword = await bcrypt.hash(afterPassword, 10);
    const user_db = await getUserByEmail(useremail);   // 사용자 존재하는지 확인
    if (user_db.length > 0) {
        const user = user_db[0];
        const isPasswordMatch = await comparePassword(beforePassword, user.user_password);
        if (isPasswordMatch) {
            console.log('1-1');
            const check_db = await getUserByEmailAndName(hashedAfterPassword, useremail, username);
            if(check_db){
                return check_db
            }else{
                throw new BaseError 
            }
        } else {
            throw new BaseError(status.PASSWORD_WRONG);
        }
    } else {
        throw new BaseError(status.LOGIN_PARAM_NOT_EXIST);
    }
}

export const sleepUserService = async(body) => {
    const {useremail, userpassword} = body;
    const user_db = await getUserByEmail(useremail);

    if(user_db.length > 0)
    {
        const user = user_db[0];
        const isPasswordMatch = await comparePassword(userpassword, user.user_password);

        if(isPasswordMatch){
            await changeActiveUser(user);
            return sleepUserResponseDTO(user);
        } else {
            throw new BaseError(status.PASSWORD_WRONG);
        }
    } else{
        throw new BaseError(status.LOGIN_PARAM_NOT_EXIST);
    }
};
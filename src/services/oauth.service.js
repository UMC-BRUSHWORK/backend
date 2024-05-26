import bcrypt from 'bcrypt';

import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

import { generateToken, verifyKakaoToken, verifyGoogleIdToken } from '../middleware/jwt';
import { comparePassword } from '../middleware/auth';

import { getUserByEmail, updateAccess } from '../models/auth.dao';
import { loginResponseDTO } from '../dtos/auth.dto';

// 소셜 로그인
import { createUser } from '../models/oauth.dao';
import { kakaoLoginResponseDTO, googleLoginResponseDTO } from '../dtos/oauth.dto';

export const loginUser = async (body) => {
    const { user_email, user_password, kakao_token, google_token } = body;

    // 카카오
    if (kakao_token) {
        return kakaoLoginUser(kakao_token);
    }

    // 구글
    if (google_token) {
        return googleLoginUser(google_token);
    }

    // 일반
    if (user_email && user_password) {
        return loginWithEmail(user_email, user_password);
    }

    throw new BaseError(status.LOGIN_PARAM_NOT_EXIST);
};

// 기존 auth 함수
const loginWithEmail = async (user_email, user_password) => {
    const user_db = await getUserByEmail(user_email);   // 사용자 존재하는지 확인
    if (user_db.length > 0) {
        const user = user_db[0];
        const hashedPassword = await bcrypt.hash(user.user_password, 10);
        
        const isPasswordMatch = await comparePassword(user_password, hashedPassword);

        if (isPasswordMatch) {      // 비밀번호 일치
            const token = generateToken(user.user_nickname);
            const result = await updateAccess(user.user_id);
            return loginResponseDTO(result, token);
        } else {    //비밀번호가 일치하지 않음
            throw new BaseError(status.LOGIN_PASSWORD_WRONG);
        }
    } else {    // 사용자 없음
        throw new BaseError(status.LOGIN_PARAM_NOT_EXIST);
    }
};

// 카카오
const kakaoLoginUser = async (kakao_token) => {
    try {
        const token = verifyKakaoToken(kakao_token);

        let user = await getUserByKakao(kakaoId, 'kakao');
        if (!user) {
            user = await createUser({ user_nickname, social_id: kakaoId, provider: 'kakao' });
        }
        
        const result = await updateAccess(user.user_id);
        return kakaoLoginResponseDTO(result, token);
    } catch (error) {
        throw new BaseError(status.TOKEN_IS_INVALID);
    }
};

// 구글
const googleLoginUser = async (google_token) => {
    try {
        const token = verifyGoogleIdToken(google_token);

        let user = await getUserByGoogle(googleId, 'google');
        if (!user) {
            user = await createUser({ user_nickname, social_id: googleId, provider: 'google' });
        }
        
        const result = await updateAccess(user.user_id);
        return googleLoginResponseDTO(result, token);
    } catch (error) {
        throw new BaseError(status.TOKEN_IS_INVALID);
    }
};
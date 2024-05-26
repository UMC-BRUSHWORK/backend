import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

// 카카오 api 호출
import axios from 'axios';

// 구글
import { OAuth2Client } from 'google-auth-library';

// 환경변수 설정
dotenv.config();

// 클라이언트 설정
const kakaoClientId = process.env.KAKAO_CLIENT_ID;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(googleClientId);

// JWT 생성 함수
export const generateToken = (user_nickname) => {
    try {
        const token = jwt.sign(
            {
                type: 'JWT',
                user_nickname: user_nickname,
            },
            process.env.JWT_SECRET_KEY,
            {
                algorithm: process.env.JWT_ALGORITHM,
                expiresIn: '15m',
                issuer: "malibu",
            }
        );
        return token;
    } catch (error) {
        // Handle JWT signing error
        console.error('Error generating token:', error);
        throw new BaseError(status.TOKEN_IS_INVALID);
    }
};

// 카카오 액세스 토큰 검증
export const verifyKakaoToken = async (kakao_token) => {
    try {
        const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${kakao_token}`,
            },
        });
        const user = response.data;
        return user;
    } catch (error) {
        // Handle Kakao token verification error
        console.error('Error verifying Kakao token:', error);
        throw new BaseError(status.TOKEN_IS_INVALID);
    }
};

// 구글 id 토큰 검증
export const verifyGoogleIdToken = async (google_token) => {
    try {
        const ticket = await client.verifyIdToken({
            google_token,
            audience: googleClientId,
        });
        const payload = ticket.getPayload();
        return payload;
    } catch (error) {
        // Handle ID token verification error
        console.error('Error verifying Google ID token:', error);
        throw new BaseError(status.TOKEN_IS_INVALID);
    }
};
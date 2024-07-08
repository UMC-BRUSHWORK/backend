const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID || '596ecabbb4a2d9b14725e56ee7c6f15a';
const CALLBACK_URL = process.env.CALLBACK_URL || 'https://brushwork.shop/oauth';

import { kakaoLoginUser, googleLoginUser } from "../services/oauth.service";
import asyncWrap from "../middleware/errorControl";

dotenc.config();

// 카카오
export const kakaoLoginController = async (req, res) => {
    // 1. 인가 코드 받기
    // 2. 토큰 받기  
    passport.use(new KakaoStrategy({
        clientID: KAKAO_CLIENT_ID,
        callbackURL: CALLBACK_URL,
    }, function (accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        console.log(profile);
        return done(null, profile);
    }));

    // 3. 사용자 정보 받기
    // 세션에 사용자 정보 저장
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    // 세션에서 사용자 정보 읽기
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
};

// 구글
export const googleLoginController = async (req, res) => {};

module.exports = passport;
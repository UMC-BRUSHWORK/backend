import { BaseError } from "../../config/error";
import { response } from "../../config/response";
import { status } from "../../config/response.status";

import { kakaoLoginUser, googleLoginUser } from "../services/oauth.service";

// 카카오
export const kakaoLoginController = async (req, res) => {
    const passport = require('passport')
    const KakaoStrategy = require('passport-kakao').Strategy

    passport.use('kakao-login', new KakaoStrategy({
        clientID: '596ecabbb4a2d9b14725e56ee7c6f15a',       // [REST API Key]
        callbackURL: '[등록한 Redirect URI]',               // [등록한 Redirect URI]
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
    }));
};

// 구글
export const googleLoginController = async (req, res) => {
    const passport = require('passport')
    const googleStrategy = require('passport-kakao').Strategy

    passport.use('google-login', new googleStrategy({
        clientID: '[REST API Key]',
        callbackURL: '[등록한 Redirect URI]',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
    }));
};
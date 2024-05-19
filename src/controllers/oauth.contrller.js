import { BaseError } from "../../config/error";
import { response } from "../../config/response";
import { status } from "../../config/response.status";

import { socialLoginUser } from "../services/oauth.service";


export const kakaoLoginController = async (req, res) => {
    const passport = require('passport')
    const KakaoStrategy = require('passport-kakao').Strategy

    passport.use('kakao-login', new KakaoStrategy({
        clientID: '[REST API Key]',
        callbackURL: '[등록한 Redirect URI]',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
    }));
};
export const socialLoginController = async (req, res) => {
    res.send(response(status.SUCCESS, await socialLoginUser(req.body)));
};

export const socialLogoutController = (req, res) => {
    req.session.destroy((err) => {throw new BaseError(status.SESSEION_DELETE_ERR)});
    res.send(response(status.SUCCESS, "소셜 로그아웃 성공"))
};
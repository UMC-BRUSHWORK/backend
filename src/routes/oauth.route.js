import express from 'express';
import session from 'express-session';
import passport from './auth';
import asyncHandler from 'express-async-handler';
import { kakaoLoginController, googleLoginController} from '../controllers/oauth.controller';

export const oauthRouter = express.Router();

oauthRouter.use(session({ secret: 'SECRET_KEY', resave: false, saveUninitialized: false }));
oauthRouter.use(passport.initialize());
oauthRouter.use(passport.session());

// 로그인 라우트
oauthRouter.post('/login/kakao', asyncHandler( kakaoLoginController));
oauthRouter.post('/login/google', asyncHandler( googleLoginController));

// 카카오 로그인 페이지로 이동
oauthRouter.get('/auth/kakao', passport.authenticate('kakao-login'));

// 콜백 라우트 : 인증 전략 실행
oauthRouter.get('/auth/kakao/callback', passport.authenticate('kakao-login', {failureRedirect: '/'}), 
    (req, res) => {
        // 성공 시 리디렉션할 경로 설정
        res.redirect('/');
});

module.exports = oauthRouter;
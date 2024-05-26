import express from 'express';
import asyncHandler from 'express-async-handler';
import { kakaoLoginController, googleLoginController} from '../controllers/oauth.controller';

export const oauthRouter = express.Router();

oauthRouter.post('/login/kakao', asyncHandler( kakaoLoginController));
oauthRouter.post('/login/google', asyncHandler( googleLoginController));

// 카카오 로그인 페이지로 이동
router.get('/kakao', passport.authenticate('kakao-login'));

// 카카오 인증 전략 실행
router.get('/auth/kakao/callback', passport.authenticate('kakao-login', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;
import express from 'express';
import passport from 'passport';
import { kakaoCallbackController, kakaoLoginController, kakaoLogoutController } from '../controllers/oauth.controller';

export const oauthRouter = express.Router();

oauthRouter.post('/kakao/logout', kakaoLogoutController);

oauthRouter.get('/kakao', kakaoLoginController);
oauthRouter.get('/kakao/callback', kakaoCallbackController);
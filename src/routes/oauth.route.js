import express from 'express';
import passport from 'passport';
import { kakaoCallbackController, kakaoLoginController } from '../controllers/oauth.controller';

export const oauthRouter = express.Router();

oauthRouter.get('/kakao/login', kakaoLoginController);
oauthRouter.get('/kakao/callback', kakaoCallbackController);

// oauthRouter.get('/kakao', passport.authenticate('kakao'));

// oauthRouter.get('/kakao/callback', passport.authenticate('kakao', {
//   failureRedirect: '/',
// }), (req, res) => {
//   console.log("Success!");
//   console.log("res", res);
//   console.log("req", req);
//   res.redirect('/');
// }
// );

// oauthRouter.post('/kakao/callback', asyncHandler(kakaoLoginController));
import express from 'express';
import asyncHandler from 'express-async-handler';
import { loginController, logoutController } from '../controllers/auth.controller';
import { kakaoLoginController, googleLoginController} from '../controllers/oauth.controller';

export const authRouter = express.Router();

authRouter.post('/login', asyncHandler(loginController));
authRouter.post('/logout', asyncHandler(logoutController))

authRouter.post('/login/kakao', asyncHandler( kakaoLoginController));
authRouter.post('/login/google', asyncHandler( googleLoginController));

// 로그인 요청
router.post('/login', isNotLoggedIn, (req, res, next) => {
    // Auhenticate 호출
    passport.auhenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        } return req.login(user, (loginError) => {
            if (loginError) {
                console.error(user, (loginError));
                return next(loginError);
            }
            return res.redirect(`/`);
        });
    }) (req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.detroy();
    res.redirect('/');
})

module.exports = router;
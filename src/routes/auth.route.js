import express from 'express';
import asyncHandler from 'express-async-handler';


import { loginController, logoutController, findEmailController, resignController, registerController, changepasswordController, sleepUserController } from '../controllers/auth.controller';
// import { register } from '../controllers/register.controller';
// import { resign } from '../controllers/resign.controller';

export const authRouter = express.Router();

authRouter.post('/login', asyncHandler(loginController));   // 로그인
authRouter.post('/logout', asyncHandler(logoutController)); // 로그아웃

authRouter.post('/register', asyncHandler(registerController)); // 회원 가입
authRouter.patch('/resign', asyncHandler(resignController));    // 회원 탈퇴

authRouter.post('/email', asyncHandler(findEmailController));  // 이메일 찾기 (아이디 찾기)
authRouter.post('/password', asyncHandler(changepasswordController)); // 비밀번호 변경

authRouter.patch('/sleep', asyncHandler(sleepUserController)); //휴먼계정 관리
// authRouter.patch('/resign', resign);

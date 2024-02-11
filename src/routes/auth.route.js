import express from 'express';
import asyncHandler from 'express-async-handler';

import { jwtAuthenticationMiddleware } from '../middleware/jwt.auth';

import { loginController, logoutController, findEmailController, resignController, registerController, changepasswordController, sleepUserController } from '../controllers/auth.controller';

export const authRouter = express.Router();

authRouter.post('/login', asyncHandler(loginController));   // 로그인
authRouter.post('/logout', jwtAuthenticationMiddleware, asyncHandler(logoutController)); // 로그아웃

authRouter.post('/register', asyncHandler(registerController)); // 회원 가입
authRouter.patch('/resign', jwtAuthenticationMiddleware, asyncHandler(resignController));    // 회원 탈퇴

authRouter.post('/finduser/email', jwtAuthenticationMiddleware, jwtAuthenticationMiddleware, asyncHandler(findEmailController));  // 이메일 찾기 (아이디 찾기)
authRouter.post('/finduser/password', jwtAuthenticationMiddleware, asyncHandler(changepasswordController)); // 비밀번호 변경

authRouter.patch('/sleep', asyncHandler(sleepUserController)); //휴먼계정 관리

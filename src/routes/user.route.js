import express from 'express';
import asyncHandler from 'express-async-handler';
import { addOrChangeUserLike, getUserLike } from '../controllers/user.controller';
import { jwtAuthenticationMiddleware } from '../middleware/jwt.auth';

export const userRouter = express.Router();

userRouter.get('/:userId/like', jwtAuthenticationMiddleware, asyncHandler(getUserLike));     // 사용자 관심 작품 조회 API
userRouter.post('/:userId/like', jwtAuthenticationMiddleware, asyncHandler(addOrChangeUserLike));   // 사용자 관심 작품 등록/상태 변경 API
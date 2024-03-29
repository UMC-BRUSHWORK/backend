import express from 'express';
import asyncHandler from 'express-async-handler';
import { addOrChangeUserLike, getUserLike } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.get('/:userId/like', asyncHandler(getUserLike));     // 사용자 관심 작품 조회 API
userRouter.post('/:userId/like', asyncHandler(addOrChangeUserLike));   // 사용자 관심 작품 등록/상태 변경 API
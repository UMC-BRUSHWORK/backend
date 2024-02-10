import express from 'express';
import asyncHandler from 'express-async-handler';
import { addOrChangeUserLike, getUserInfoController, getUserLike, updateUserInfoController } from '../controllers/user.controller';
import { jwtAuthenticationMiddleware } from '../middleware/jwt.auth';
import { imageUploader } from '../middleware/image.uploader';

export const userRouter = express.Router();

userRouter.get('/:userId/like', jwtAuthenticationMiddleware, asyncHandler(getUserLike));     // 사용자 관심 작품 조회 API
userRouter.post('/:userId/like', jwtAuthenticationMiddleware, asyncHandler(addOrChangeUserLike));   // 사용자 관심 작품 등록/상태 변경 API

userRouter.patch('/:userId', jwtAuthenticationMiddleware, imageUploader.single('image'), asyncHandler(updateUserInfoController));

userRouter.get('/:userId', jwtAuthenticationMiddleware, asyncHandler(getUserInfoController));
import express from "express";
import asyncHandler from 'express-async-handler';

import { tosController, tosListController, tosOptionController, tosUserListController } from "../controllers/tos.controller";


export const tosRouter = express.Router();

// 약관 등록
tosRouter.post('/register', asyncHandler(tosController));

// 약관 동의 수정
tosRouter.patch('/:utId', asyncHandler(tosOptionController));

// 약관 리스트 전달 (위는 단순 약관(tos), 아래는 사용자 약관(user_tos))
tosRouter.get('/list', asyncHandler(tosListController));
tosRouter.get('/:userId', asyncHandler(tosUserListController));
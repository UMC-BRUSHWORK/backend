import express from "express";

import { newTosController, editTosAgreeController } from "../controllers/tos.controller.js";

export const tosRouter = express.Router();

// 약관 등록
tosRouter.post('/register', newTosController);

// 약관 동의 수정
tosRouter.patch('/:utId', editTosAgreeController);
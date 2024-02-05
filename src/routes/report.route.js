import express from "express";

import asyncHandler from 'express-async-handler';

import { newReportController, getReportController } from "../controllers/report.controller.js";

export const reportRouter = express.Router();

// 신고 접수
reportRouter.post('/register', newReportController);

// 신고 내역 조회
reportRouter.get('/context', asyncHandler(getReportController));
import express from "express";
import asyncHandler from "express-async-handler";
import { jwtAuthenticationMiddleware } from '../middleware/jwt.auth';


import { receiveReportController } from '../controllers/report.controller';

export const reportRouter = express.Router();

// 신고 접수
reportRouter.post('/receive', asyncHandler(receiveReportController));
import express from "express";

import asyncHandler from 'express-async-handler';

import { newReviewController, renewReviewController, getReviewContentController, getReviewListController } from "../controllers/review.controller.js";

export const reviewRouter = express.Router();

// 후기 등록
productRouter.post('/register', asyncHandler(newReviewController));

// 후기 상태 변경
productRouter.patch('/:reviewId', asyncHandler(renewReviewController));

// 후기 정보 조회
productRouter.get('/:reviewId', asyncHandler(getReviewContentController));

// 후기 목록 조회
productRouter.get('/list', asyncHandler(getReviewListController));
import express from "express";

import asyncHandler from 'express-async-handler';

import { getReviewContentController, getReviewListController, newReviewController, renewReviewController } from "../controllers/review.contorller.js";

export const reviewRouter = express.Router();

// 후기 등록
reviewRouter.post('/register', asyncHandler(newReviewController));

// 후기 상태 변경
reviewRouter.patch('/:reviewId', asyncHandler(renewReviewController));

// 후기 정보 조회
reviewRouter.get('/:reviewId', asyncHandler(getReviewContentController));

// 후기 목록 조회
reviewRouter.get('/list', asyncHandler(getReviewListController));
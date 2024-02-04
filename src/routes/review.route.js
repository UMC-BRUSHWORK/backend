import express from "express";

import asyncHandler from 'express-async-handler';

import { getReviewContentController, getReviewListController, newReviewController } from "../controllers/review.controller";

export const reviewRouter = express.Router();

// 후기 등록
reviewRouter.post('/register', asyncHandler(newReviewController));
// 작가 전체 후기 목록 조회
reviewRouter.get('/list', asyncHandler(getReviewListController));
// 후기 정보 조회
reviewRouter.get('/:reviewId', asyncHandler(getReviewContentController));


import express from "express";

import asyncHandler from 'express-async-handler';

import { newProductController, editProductInfoController, getProductInfoController, getProductListController, dealProductController } from "../controllers/product.controller";
import { imageUploader } from "../middleware/image.uploader.js";
import { jwtAuthenticationMiddleware } from "../middleware/jwt.auth.js";
// import { newProductController, editProductInfoController, getProductInfoController, getProductListController, searchProductController } from "../controllers/product.controller.js";

export const productRouter = express.Router();

// 작품 등록
productRouter.post('/register', jwtAuthenticationMiddleware, imageUploader.array('images', 10), asyncHandler(newProductController));

// 작품 조회 관련(리스트, 세부 조회)
productRouter.get('/list', asyncHandler(getProductListController)); // 작품 리스트 조회
productRouter.get('/:productId', asyncHandler(getProductInfoController));   // 작품 정보 세부 조회

// 거래 상태 변경
productRouter.patch('/deal', jwtAuthenticationMiddleware, asyncHandler(dealProductController));
// 작품 정보 수정
productRouter.patch('/:productId', jwtAuthenticationMiddleware, imageUploader.array('images', 10), asyncHandler(editProductInfoController));

// 작품 정보 조회
productRouter.get('/:productId', asyncHandler(getProductInfoController));

// 작품 리스트 조회
productRouter.get('/list', asyncHandler(getProductListController));

// 작품 검색 조회
// productRouter.get('/:keyword', asyncHandler(searchProductController));

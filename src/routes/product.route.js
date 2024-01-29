import express from "express";

import asyncHandler from 'express-async-handler';

import { newProductController, editProductInfoController, getProductInfoController, getProductListController } from "../controllers/product.controller";
import { imageUploader } from "../middleware/image.uploader.js";

export const productRouter = express.Router();

// 작품 등록
productRouter.post('/register', imageUploader.array('images', 10), asyncHandler(newProductController));

// 작품 조회 관련
productRouter.get('/list', asyncHandler(getProductListController)); // 작품 리스트 조회
productRouter.get('/:productId', asyncHandler(getProductInfoController));   // 작품 정보 세부 조회

// 작품 정보 수정
productRouter.patch('/:productId', imageUploader.array('images', 10), asyncHandler(editProductInfoController));

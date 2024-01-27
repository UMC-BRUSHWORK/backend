import express from "express";

import asyncHandler from 'express-async-handler';

import { newProductController, editProductInfoController, getProductInfoController, getProductListController } from "../controllers/product.controller.js";

export const productRouter = express.Router();

// 작품 등록
productRouter.post('/register', newProductController);

// 작품 정보 수정
productRouter.patch('/:productId', editProductInfoController);

// 작품 정보 조회
productRouter.get('/:productId', asyncHandler(getProductInfoController));

// 작품 리스트 조회
productRouter.get('/list', asyncHandler(getProductListController));
import express from "express";

import asyncHandler from 'express-async-handler';

import { newProduct, editProductInfo, getProductInfo, getProductList } from "../controllers/product.controller.js";

export const productRouter = express.Router();

// 작품 등록
productRouter.post('/register', newProduct);

// 작품 정보 수정
productRouter.patch('/:productId', editProductInfo);

// 작품 정보 조회
productRouter.get('/:productId', asyncHandler(getProductInfo));

// 작품 리스트 조회
productRouter.get('/list', asyncHandler(getProductList));
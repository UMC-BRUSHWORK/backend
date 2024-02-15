import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { dealProduct, joinProduct, rejoinProduct } from "../services/product.service.js";
import { joinProductInfo, joinProductKeyword, joinProductList } from "../providers/product.provider.js";

// 작품 등록 
export const newProductController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinProduct(req.body, req.files)));
}

// 작품 정보 수정 관련 Controller
export const editProductInfoController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await rejoinProduct(req.params.productId, req.body)));
}

// 작품 정보 조회 관련 Controller
export const getProductInfoController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinProductInfo(req.params.productId)));
}

// 작품 목록 조회
export const getProductListController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinProductList(req.query)));
}

// 작품 거래 상태 변경 (거래 성사)
export const dealProductController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await dealProduct(req.body)));
}

// 작품 검색 조회 관련 Controller
export const searchProductController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinProductKeyword(req.query)));
}
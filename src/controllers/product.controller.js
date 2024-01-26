import { BaseError } from "../../config/error";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { joinProduct, rejoinProduct } from "../service/product.service.js";
import { joinProductInfo, joinProductList } from "../provider/product.provider.js";

// 작품 등록 또는 상태 변경(숨기기 또는 삭제) 관련 Controller
export const newProductController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinProduct(req.body)));
}

// 작품 정보 수정 관련 Controller
export const editProductInfoController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await rejoinProduct(req.body)));
}

// 작품 정보 조회 관련 Controller
export const getProductInfoController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinProductInfo(req.body)));
}

// 작품 목록 조회 관련 Controller
export const getProductListController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinProductList(req.body)));
}
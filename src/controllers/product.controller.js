import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { joinProduct, rejoinProduct } from "../service/product.service.js";
import { joinProductInfo, joinProductList } from "../provider/product.provider.js";

// 작품 등록
export const newProduct = async (req, res, next) => {
    console.log("작품 등록 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await joinProduct(req.body)));
}

// 작품 정보 수정
export const editProductInfo = async (req, res, next) => {
    console.log("작품 정보 수정 요청하였습니다!");
    console.log("body:", req.body);
    
    res.send(response(status.SUCCESS, await rejoinProduct(req.body)));
}

// 작품 정보 조회
export const getProductInfo = async (req, res, next) => {
    console.log("작품 정보 조회 요청하였습니다!");
    console.log("body:", req.body);
    
    res.send(response(status.SUCCESS, await joinProductInfo(req.body)));
}

// 작품 리스트 조회
export const getProductList = async (req, res, next) => {
    console.log("작품 리스트 조회 요청하였습니다!");
    console.log("body:", req.body);
    
    res.send(response(status.SUCCESS, await joinProductList(req.body)));
}
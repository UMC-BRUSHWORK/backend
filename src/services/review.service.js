import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { reviewResponseDTO } from "../dtos/review.dto"
import { addReviewDB, findAlreadyRegisterReviewDao, findExistSalesDao } from "../models/review.dao";

// 후기 등록
export const newReviewService = async (body) => {
    
    const { productId, userId, reviewRate, reviewContent } = body;
    
    // 판매 여부 확인, 이미 등록된 리뷰인지 확인
    const existSales = await findExistSalesDao(productId, userId);
    const alreadyRegister = await findAlreadyRegisterReviewDao(productId, userId);

    if(alreadyRegister){    // 이미 등록된 리뷰일 시
        throw new BaseError(status.ALREADY_EXIST_REVIEW);
    }

    if(existSales){
        // 판매된 작품일 시
        const joinReviewData = await addReviewDB(productId, userId, reviewRate, reviewContent);
        return reviewResponseDTO(joinReviewData);
    }else{
        throw BaseError(status.NO_SALES_HISTORY);
    }
}
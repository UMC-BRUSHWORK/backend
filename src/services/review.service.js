import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import reviewResponseDTO from "../dtos/review.dto"
import { addReviewDB, getReviewDB, getReviewListDB, isVisibleDB, setReviewListDB } from "../models/review.dao";

// 후기 등록
export const joinReview = async (body) => {
    const createdAt = new Date(body.createYear, body.createMonth, body.createDay, body.createTime);
    
    const reviews = body.reviewer_id;
   
    const joinReviewData = await addReviewDB({
        'review_id': review[i].review_id,
        'review_product': review[i].review_product,
        "review_context": review[i].review_context, 
        "review_rate": data[0].review_rate, 
        'created_at': review[i].created_at,
    });

    // 후기 목록 매핑
    for (let i = 0; i < reviews.length; i++) {
        await setReviewListDB(joinReviewData, reviews[i]);
    }
    return reviewResponseDTO(
        await getReviewDB(joinReviewData), 
        await getReviewListDB(joinReviewData)
    );
}


// 후기 상태 변경
export const rejoinReview = async (body) => {
    const updatedAt = new Date(body.updateYear, body.updateMonth, body.updateDay, body.updateTime);

    // 수정된 데이터
    const rejoinReviewData = await isVisibleDB({
        'review_status': body.review_status,
        'updatedAt': updatedAt        
    });

    // 데이터 일치 확인
    if (isDataMatch) {
        // 후기 목록 매핑
        for (let i = 0; i < reviews.length; i++) {
            await setReviewListDB(rejoinReviewData, reviews[i]);
        }
    
        return reviewResponseDTO(
            await getReviewDB(rejoinReviewData), 
            await getReviewListDB(rejoinReviewData)
        );
    // 상태 변경 실패한 경우
    } else {
        throw new BaseError(status.STATUS_CHANGE_ERR);
    }
}
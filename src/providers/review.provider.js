import { getReviewListResponseDTO, reviewContentResponseDTO } from "../dtos/review.dto";
import { getReviewDB, getReviewListDB } from "../models/review.dao";

// 후기 내용 조회
export const getReviewContentService = async (reviewId) => {
    return reviewContentResponseDTO(await getReviewDB(parseInt(reviewId)));
}

// 후기 목록 조회
export const getReviewListService = async (query) => {

    const {userId, paging = 3, cursorId = -1} = query;

    console.log("provider", userId, cursorId, paging);

    return getReviewListResponseDTO(await getReviewListDB(parseInt(userId), parseInt(cursorId), parseInt(paging)));
}
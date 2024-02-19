import { getReviewListResponseDTO, getUserReviewListResponseDTO, reviewContentResponseDTO } from "../dtos/review.dto";
import { getReviewDB, getReviewListDB, getUserReviewListDao } from "../models/review.dao";

// 후기 내용 조회
export const getReviewContentService = async (reviewId) => {
    return reviewContentResponseDTO(await getReviewDB(parseInt(reviewId)));
}

// 후기 목록 조회
export const getReviewListService = async (query) => {

    const {userId, paging = 3, cursorId = -1} = query;

    return getReviewListResponseDTO(await getReviewListDB(parseInt(userId), parseInt(cursorId), parseInt(paging)));
}

// 내가 작성한 후기 목록 조회(소비자 목록 )
export const getUserReviewListProvider = async (userId, query) => {

    const { paging = 5, cursorId = -1} = query;

    return getUserReviewListResponseDTO(await getUserReviewListDao(parseInt(userId), parseInt(paging), parseInt(cursorId)));
}
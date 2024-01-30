import { reviewResponseDTO, getReviewListResponseDTO } from "../dtos/reviewer.dto";
import { getReviewDB, getReviewListDB } from "../models/reviewer.dao";

// 후기 내용 조회
export const joinReviewContent = async () => {
    return reviewResponseDTO(await getReviewDB());
}

// 후기 목록 조회
export const joinReviewList = async (reviewer_id, query) => {

    const {paging = 3, cursorId = -1} = query;

    console.log("provider", reviewer_id, cursorId, paging);

    return getReviewListResponseDTO(await getReviewListDB(parseInt(reviewer_id), parseInt(cursorId), parseInt(paging)));
}
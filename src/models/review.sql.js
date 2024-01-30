// 후기 등록(추가)
export const insertReviewSql = "INSERT INTO review (review_id, review_product, review_context, review_rate, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP());";

// 후기 조회
export const getReviewIdSql = "SELECT * FROM review WHERE review_id = ?";
export const getReviewListIdSql = "SELECT * FROM review WHERE reviewer_id = ?";

// 후기 정보 수정
export const reviewStatusSql = 
"UPDATE review SET review_status = ? WHERE review_id = ?;"
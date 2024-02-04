// 후기 등록(추가)
export const insertReviewSql = "INSERT INTO review (review_product_id, review_consumer_id, review_context, review_rate) VALUES (?, ?, ?, ?);";

// 후기 조회
export const getReviewIdSql = "SELECT * FROM review WHERE review_id = ?";
export const getReviewListIdSql = "SELECT * FROM review WHERE reviewer_id = ?";

// 후기 정보 수정
export const reviewStatusSql = 
"UPDATE review SET review_status = ? WHERE review_id = ?;"
// 후기 등록(추가)
export const findExistSalesSql = "SELECT EXISTS (SELECT 1 FROM sales WHERE sales_product_id = ? and sales_consumer_id = ? ) as isExist";

export const getSalesIdSql = "SELECT sales_id FROM sales WHERE sales_product_id = ? and sales_consumer_id = ?";

export const findAlreadyRegisterReviewSql = "SELECT EXISTS (SELECT 1 FROM review WHERE review_product_id = ? and review_consumer_id = ? ) as isAlreadyRegister";
export const insertReviewSql = "INSERT INTO review (review_product_id, review_consumer_id, review_context, review_rate) VALUES (?, ?, ?, ?);";

// 후기 상세 조회
export const getReviewIdSql = "SELECT r.review_id, r.review_product_id, r.review_consumer_id, r.review_context, "+
"r.review_rate, r.review_status, r.created_at, u.user_nickname "+
"FROM review r inner join user u on review_consumer_id = user_id WHERE review_id = ?;";

// 작가별 후기 리스트 조회
export const getReviewCountSql = "SELECT COUNT(*) as reviewCursor from review;"
export const getReviewListIdSql = "SELECT review_id, review_product_id, review_consumer_id, review.created_at, review_context, review_status, user_nickname "+
"FROM review JOIN user on review_consumer_id = user_id "+
"WHERE review_product_id IN (SELECT sales_product_id FROM sales WHERE sales_author_id = ?) and review_id < ? "+
"ORDER BY review_id DESC LIMIT ?";

export const getUserReviewListSql =
"SELECT review_id, review_product_id, review_consumer_id, review_context, review_status, review.created_at, user_nickname, p.product_author_id, p.product_name, p.product_preview_img, p.product_author_nickname "+
"FROM review "+
"JOIN user on review_consumer_id = user_id "+
"JOIN product p ON review_product_id = p.product_id "+
"WHERE review_product_id IN (SELECT sales_product_id FROM sales WHERE sales_consumer_id = ?) and review_id < ? "+
"ORDER BY review_id DESC LIMIT ?";

// reviewStatus 업데이트
export const updateReviewStatusSql = "UPDATE sales SET review_status = 1 WHERE sales_id = ?";

// 사용자 관심 작품 중 가장 최근 index가 무엇인지 확인
export const countUserLike = "SELECT fv_id as likeCount from favor_product order by fv_id DESC limit 1;";

// 사용자 관심 작품 - 사용자 아이디, 커서 아이디, paging 사이즈 -> 변수로 필요
export const selectUserLikeList =
"SELECT fp.fv_id, fp.favor_user_id, fp.favor_status, fp.favor_product_id, p.product_name, p.product_author_nickname, p.product_status, p.product_preview_img "
+"FROM favor_product fp JOIN product p on fp.favor_product_id = p.product_id "
+"WHERE fp.favor_user_id = ? AND fp.fv_id < ? "
+"ORDER BY fp.fv_id DESC LIMIT ?";

export const findUserLikeCount = "SELECT COUNT(*) as favorExist, favor_status, fv_id FROM favor_product WHERE favor_user_id = ? and favor_product_id = ?;"

export const findUserLike = "SELECT * FROM favor_product WHERE favor_user_id = ? and favor_product_id = ?;"
export const getUserLikeToIndexId = "SELECT * FROM favor_product WHERE fv_id = ?;"

export const insertUserLike = "INSERT INTO favor_product (favor_user_id, favor_product_id) VALUES (?, ?);"

export const updateUserLike = "UPDATE favor_product SET favor_status = ? WHERE fv_id = ?;";
export const updateProductLikeCount =
"UPDATE product SET favor_count = (SELECT COUNT(*) FROM favor_product WHERE "+
"favor_product_id = ? and favor_status = 1) "+
"WHERE product_id = ?";

export const getUserByUserIdSql = "SELECT user_id, user_nickname, user_profile, user_introduce FROM user WHERE user_id = ? and user_status = 1";

export const updateUserInfoSql = "UPDATE user SET user_nickname = ?, user_profile = ?, user_introduce = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?"
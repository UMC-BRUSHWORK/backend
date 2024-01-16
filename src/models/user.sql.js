
// 사용자 관심 작품 중 가장 최근 index가 무엇인지 확인
export const countUserLike = "SELECT COUNT(*) as likeCount from favor_product";

// 사용자 관심 작품 - 사용자 아이디, 커서 아이디, paging 사이즈 -> 변수로 필요
export const selectUserLikeList =
"SELECT fp.fv_id, fp.favor_user_id, fp.favor_status, fp.favor_product_id, p.product_name, p.product_author_nickname "
+"FROM favor_product fp JOIN product p on fp.favor_product_id = p.product_id "
+"WHERE fp.favor_user_id = ? AND fp.fv_id < ? "
+"ORDER BY fp.fv_id DESC LIMIT ?";
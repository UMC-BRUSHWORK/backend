// 약관 등록(추가)
export const insertTosSql = "INSERT INTO user_tos (ut_tos_id, ut_user_id, ut_agree) VALUES (?, ?, ?);";

// 약관 정보 수정
export const updateTosInfoSql = 
"UPDATE user_tos SET ut_agree = ?, updated_at = CURRENT_TIMESTAMP() WHERE ut_id = ?;"

// 약관 리스트
export const getTosSql = "SELECT tos_id, tos_title, tos_context FROM tos";
export const getUserTosSql = "SELECT ut_id, ut_tos_id, ut_user_id, ut_agree, tos_title, tos_context FROM user_tos INNER JOIN tos on tos_id = ut_tos_id where ut_user_id = ?";
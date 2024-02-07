
// 약관 존재 확인
export const confirmTosIdSql = "SELECT EXISTS(SELECT 1 FROM user_tos WHERE ut_id = ?) as isExistTosId";

// 약관 필수 확인
export const essentialTosIdSql = "SELECT EXISTS(SELECT 1 FROM user_tos WHERE ut_tos_id = ?) as isEssential";

// 약관 등록(추가)
export const insertTosSql = "INSERT INTO user_tos (ut_id, ut_tos_id, ut_user_id, ut_agree, created_at) VALUES (?, ?, ?, ?, ?);";

// 약관 정보 수정
export const updateTosInfoSql = 
"UPDATE user_tos SET ut_agree = ?, updated_at = CURRENT_TIMESTAMP() WHERE ut_id = ?;"
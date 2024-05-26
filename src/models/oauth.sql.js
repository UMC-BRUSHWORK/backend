export const getUserByKakaoSql = 'SELECT user_id, user_nickname, user_password FROM user WHERE user_kakao = ?';
export const getUserByGoogleSql = 'SELECT user_id, user_nickname, user_password FROM user WHERE user_google = ?';

// export const getUserByGoogleSql = 'SELECT user_id, user_nickname, user_password FROM user WHERE user_google = ?';

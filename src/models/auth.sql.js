export const getUserSql = 'SELECT * FROM user WHERE user_email = ?';
export const getUserByIDSql = 'SELECT user_id, user_nickname, access_at FROM user WHERE user_id = ?';

export const updateAccessTime = 'UPDATE user SET access_at = CURRENT_TIMESTAMP() WHERE user_id = ?';

export const getEmailByphoneSql = 'SELECT * FROM user WHERE user_phone = ?';
export const updateUserStatus = 'UPDATE user SET access_at = CURRENT_TIMESTAMP(), user_status = 2 WHERE user_email = ?';
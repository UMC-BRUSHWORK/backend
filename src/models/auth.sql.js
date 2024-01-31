export const getUserSql = 'SELECT user_id, user_nickname, user_password FROM user WHERE user_email = ?';
export const getUserByIDSql = 'SELECT user_id, user_nickname, access_at FROM user WHERE user_id = ?';

export const updateAccessTime = 'UPDATE user SET access_at = CURRENT_TIMESTAMP() WHERE user_id = ?';

export const getEmailByName = 'SELECT user_email FROM user WHERE user_name = ?';

export const getUser = 'UPDATE user SET user_password = ? WHERE user_email = ? AND user_name = ?'
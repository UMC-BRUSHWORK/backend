export const getUserSql = 'SELECT * FROM user WHERE user_email = ?';
export const getUserByIDSql = 'SELECT user_id, user_nickname, access_at FROM user WHERE user_id = ?';
export const getNicknameSql = 'SELECT * FROM user WHERE user_nickname = ?';

export const updateAccessTime = 'UPDATE user SET access_at = CURRENT_TIMESTAMP() WHERE user_id = ?';

export const getEmailByName = 'SELECT user_email FROM user WHERE user_name = ?';

export const getUser = 'UPDATE user SET user_password = ? WHERE user_email = ? AND user_name = ?'

export const getEmailByphoneSql = 'SELECT * FROM user WHERE user_phone = ?';
export const updateUserStatus = 'UPDATE user SET access_at = CURRENT_TIMESTAMP(), user_status = 2 WHERE user_email = ?';

export const createUserSql = 'INSERT INTO user (user_name, user_password, user_email, user_nickname, user_phone) VALUES (?, ?, ?, ?, ?)';

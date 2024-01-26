export const selectNicknameSql = 'SELECT * FROM user WHERE user_nickname = ?';
export const selectEmailSql = 'SELECT * FROM user WHERE user_email = ?';
export const createUserSql = 'INSERT INTO user (user_name, user_password, user_email, user_nickname, user_phone) VALUES (?, ?, ?, ?, ?)';
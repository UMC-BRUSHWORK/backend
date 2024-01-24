import bcrypt from 'bcrypt';
const resignDao = require('../models/resign.dao');
import { comparePassword } from '../middleware/auth';
import { getUserByEmail } from '../models/auth.dao';

export const resignUser = async(req_email, req_password) =>{
    try{
        const user_db = await getUserByEmail(req_email);
        if(user_db.length > 0){
            const user = user_db[0];
            const hashedPassword = await bcrypt.hash(user.user_password, 10);
            const isPasswordMatch = await comparePassword(req_password, hashedPassword);


            if(isPasswordMatch){
                //비밀번호가 일치, 인증완료 삭제 쿼리
                const result = await resignDao.changeStatusByEmail(req_email);
                return result;
            }else{
                //비밀번호가 일치하지 않아 회원을 삭제할 수 없습니다!
                throw new Error('비밀번호가 일치하지 않습니다.');
            }
    }
    } catch (error){
        throw error;
    }
}  
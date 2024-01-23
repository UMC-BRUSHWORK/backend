const regiDao = require('../models/register.dao');

export const registerUser = async(req_email, req_password, req_name, req_nickname, req_phone) =>{
    try{
        const CN = await checkNickname(req_nickname);
        const CE = await checkEmail(req_email);

        if(CN){
            //이미 사용 중인 닉네임입니다.
            throw new Error('이미 사용 중인 닉네임입니다.');
        }
        if(CE){
            //이미 등록된 이메일 주소 입니다.
            throw new Error('이미 등록된 이메일 주소입니다.');
        }

        const result = await regiDao.createUser(req_email, req_password, req_name, req_nickname, req_phone);
        console.log('result' + result);
        return result;
    }catch (err) {
        //뭔가 에러가 발생함
        throw err;
    }
}

const checkNickname = async (req_nickname) => {
    try {
        const existingUser = await regiDao.getUserByNickname(req_nickname);
        return existingUser !== null;
      } catch (error) {
        throw error;
      }
}

const checkEmail = async (req_email) => {
    try {
        const existingUser = await regiDao.getUserByEmail(req_email);
        return existingUser !== null;
      } catch (error) {
        throw error;
      }
}
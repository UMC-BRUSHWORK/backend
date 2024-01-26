const registerService = require('../services/register.service');

export const register = async(req, res) =>{
    const req_email = req.body.user_email;
    const req_password = req.body.user_password;
    const req_nickname = req.body.user_nickname;
    const req_name = req.body.user_name;
    const req_phone = req.body.user_phone;

    try {
        const result =  await registerService.registerUser(req_email, req_password, req_name, req_nickname, req_phone);
        if(result){
            res.status(201).json({
                message: '회원 가입 성공' 
            });
        }else{
            res.status(500).json({
                error: '회원 가입에 실패하였습니다.',
            });
        }
        
      } catch (error) {
        console.error(error);
    
    if (error.message === '이미 사용 중인 닉네임입니다.' || error.message === '이미 등록된 이메일 주소입니다.') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: '서버 에러' });
    }
    }
};

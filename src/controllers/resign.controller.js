const resignService = require('../services/resign.service');

export const resign = async(req, res) =>{
    const req_email = req.body.user_email;
    const req_password = req.body.user_password;

    try{
        const result = await resignService.resignUser(req_email, req_password);
        if(result){
            res.status(201).json({
                message: '회원 삭제 성공' 
            });
        }else{
            res.status(500).json({
                error: '회원 삭제에 실패하였습니다.',
            });
        }
    }catch (error){
        console.error(error);
    }
};
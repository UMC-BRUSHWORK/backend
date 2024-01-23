const loginService = require('../services/login.service');//dao 설정

export const loginpage = (req, res) => {
    res.sendFile('/Users/malibu/Desktop/brushwork/backend/login.html');
};


export const login = async (req, res) => {
    const user_email = req.body.user_email;
    const user_password = req.body.user_password;
    
    console.log('1-1');

    try {
        const result = await loginService.loginUser(user_email, user_password);

        if (result) {
            res.status(200).json({
                code: 200,
                message: "토큰이 생성되었습니다",
                token: result,
            });
            
        } else {
            console.log('1-5');
            console.log('해당 ID에 대한 사용자를 찾을 수 없습니다.');
            res.status(404).json({
                code: 404,
                message: "사용자를 찾을 수 없습니다.",
            });
        }
    } catch (err) {
        console.error('1-2', err);
        res.status(500).json({
            code: 500,
            message: "서버 에러",
        });
    }
};
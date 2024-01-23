export const logoutpage = (req,res) => {
    res.sendFile('/Users/malibu/Desktop/brushwork/backend/logout.html');
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('세션 삭제 에러:', err);
            // 에러 처리 로직 추가
            return res.status(500).json({
                code: 500,
                message: "세션 삭제 중 에러가 발생했습니다.",
            });
        }
        
        res.status(200).json({
            code: 200,
            message: "로그아웃 되었습니다.",
        });
    });
};
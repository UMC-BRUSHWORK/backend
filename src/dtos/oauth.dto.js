import moment from 'moment-timezone';

export const socialLoginResponseDTO = (result, token) => {
    // token 및 user 정보 전달 (userId, userNickname)
    console.log("time", result.access_at);
    return {
        // userId, 닉네임
        "userId": result.user_id,
        "nickname": result.user_nickname,
        "AccessTime": moment.utc(result.access_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
        "token": token
    };
}
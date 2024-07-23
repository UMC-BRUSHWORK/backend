import moment from 'moment-timezone';

export const kakaoLoginResponseDTO = (tokenInfo, userInfo) => {
    return {
        // userId, 닉네임
        "userId": userInfo.user_id,
        "nickname": userInfo.user_nickname,
        "rate": userInfo.user_rate,
        "profile": userInfo.user_profile,
        "introduce": userInfo.user_introduce,
        "status": userInfo.user_status,
        "accessTime": moment.utc(userInfo.access_at).add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
        "token": tokenInfo.access_token,
        "tokenType": "bearer"
    };
}

export const googleLoginResponseDTO = (result, google_token) => {
    console.log("time", result.access_at);
    return {
        // userId, 닉네임
        "userId": result.user_id,
        "nickname": result.user_nickname,
        "AccessTime": moment.utc(result.access_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
        "token": google_token
    };
}
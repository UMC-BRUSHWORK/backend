import moment from 'moment-timezone';

export const kakaoLoginResponseDTO = (result, kakao_token) => {
    console.log("time", result.access_at);
    return {
        // userId, 닉네임
        "userId": result.user_id,
        "nickname": result.user_nickname,
        "AccessTime": moment.utc(result.access_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
        "token": kakao_token
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
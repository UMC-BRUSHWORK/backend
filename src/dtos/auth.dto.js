import moment from 'moment-timezone';

export const loginResponseDTO = (result, token) => {
    // token 및 user 정보 전달 (userId, userNickname)
    return {
        // userId, 닉네임
        "userId": result.user_id,
        "nickname": result.user_nickname,
        "AccessTime": moment.utc(result.access_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
        "token": token
    };
}

export const registerResponseDTO = (result) => {
    
    return {
        "userId": result.user_id,
        "nickname": result.user_nickname,
        "AccessTime": moment.utc(result.access_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss')
    };
}

export const resignResponseDTO = (result) => {

    return {
        "userId": result.user_id,
        "nickname": result.user_nickname,
        "status": (result.user_status == 2) ? "inactive" : "active",
        "resignTime": moment.utc(result.resign_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss')
    };
}

export const findEmailResponseDTO = (result) => {
    return {"email": result};
}
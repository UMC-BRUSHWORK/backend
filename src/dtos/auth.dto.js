import moment from 'moment-timezone';

export const loginResponseDTO = (result, token) => {
    // token 및 user 정보 전달 (userId, userNickname)
    return {
        // userId, 닉네임
        "userId": result.user_id,
        "nickname": result.user_nickname,
        "rate": result.user_rate,
        "profile": result.user_profile,
        "introduce": result.user_introduce,
        "status": result.user_status,
        "accessTime": moment.utc(result.access_at).add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
        "token": token
    };
}

export const registerResponseDTO = (result) => {
    
    return {
        "userId": result.user_id,
        "nickname": result.user_nickname,
        "accessTime": moment.utc(result.access_at).add(9, 'h').format('YYYY-MM-DD HH:mm:ss')
    };
}

export const resignResponseDTO = (result) => {

    return {
        "userId": result.user_id,
        "nickname": result.user_nickname,
        "status": (result.user_status == 2) ? "inactive" : "active",
        "resignTime": moment.utc(result.resign_at).add(9, 'h').format('YYYY-MM-DD HH:mm:ss')
    };
}

export const findEmailResponseDTO = (result) => {
    return {"email": result};
}

export const changePasswordResponseDTO = (result) => {
    return {"email": result.user_email};
}

export const inLoginsleepUserResponseDTO = (result) => {
    return {
        "userId" : result[0].user_id,
        "nickname" : result[0].user_nickname,
        "status": (result[0].user_status === 1) ? "active" : (result[0].user_status === 2) ? "inactive" : (result[0].user_status === 3) ? "sleep" : "unknown"
    };
}

export const sleepUserResponseDTO = (result) => {
    return {
        "userId" : result[0].userId,
        "nickname" : result[0].user_nickname,
        "status": (result[0].user_status === 1) ? "active" : (result[0].user_status === 2) ? "inactive" : (result[0].user_status === 3) ? "sleep" : "unknown"
    };
}
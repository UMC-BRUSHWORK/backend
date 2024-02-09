// 약관 등록
export const registerTosResponseDTO = (tosId) => {
    return { "insertUserTosId" : tosId };
}

// 약관 동의
export const editTosResponseDTO = (data) => {
    return { "updateUserTosId": data};
}

// 약관 리스트 전달
export const getTosListResponseDTO = (data) => {

    const tosList = [];

    for (let item of data) {
        tosList.push({
            "tosId": item.tos_id,
            "title": item.tos_title,
            "context": item.tos_context
        })
    }

    return tosList;
}

// 사용사별 약관 리스트 전달 
export const getTosUserListResponseDTO = (data) => {

    const tosList = [];

    for (let item of data) {
        tosList.push({
            "utId": item.ut_id,
            "tosId": item.ut_tos_id,
            "userId": item.ut_user_id,
            "agree": item.ut_agree,
            "title": item.tos_title,
            "context": item.tos_context
        })
    }

    return tosList;
}
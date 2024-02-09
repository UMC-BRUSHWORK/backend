// 약관 등록
export const registerTosResponseDTO = (tosId) => {
    return { "insertUserTosId" : tosId };
}

// 약관 동의
export const editTosResponseDTO = (data) => {
    return { "updateUserTosId": data};
}

export const getTosListResponseDTO = (data) => {
    return data;
}

export const getTosUserListResponseDTO = (data) => {
    return data;
}
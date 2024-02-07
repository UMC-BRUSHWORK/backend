// 날짜
const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}

// 약관 등록
export const registerTosResponseDTO = (data) => {
    return {
        "utId": data[0].utId, 
        "utTosId": data[0].utTosId, 
        "utUserId": data[0].utUserId, 
        "utAgree": data[0].utAgree,
        "createdAt": data[0].createdAt,        
        "cursorId": data[data.length-1].utId
    };
}

// 약관 동의
export const editTosResponseDTO = (data) => {
    return {
        "utId": data[0].utId, 
        "utTosId": data[0].utTosId, 
        "utUserId": data[0].utUserId, 
        "utAgreeId": data[0].utAgreeId,
        "updatedAt": data[0].updatedAt,        
        "cursorId": data[data.length-1].utId
   };
}
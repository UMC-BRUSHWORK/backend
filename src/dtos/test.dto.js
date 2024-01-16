
export const dbTestResponseDTO = (data) => {

    console.log("full-data", data);

    const result = data[0];

    return {
        "userID": result.user_id,
        "userEmail": result.user_email,
        "userNickname": result.user_nickname,
        "userStatus": result.user_status
    };
}
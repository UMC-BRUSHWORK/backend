
export const getUserLikeListResponseDTO = (data) => {

    const userLikeList = [];

    if(data.length>0){
        for (let i = 0; i < data.length; i++) {
            userLikeList.push({
                "fv_id": data[i].fv_id,
                "userId": data[i].favor_user_id,
                "favorStatus": data[i].favor_status,
                "productId": data[i].favor_product_id,
                "productName": data[i].product_name,
                "productAuthor": data[i].product_author_nickname,
                "productStatus": data[i].product_status,
                "productImg": data[i].product_preview_img
            })
        }

        return {"userLikeList": userLikeList, "cursorId": data[data.length-1].fv_id ? data[data.length-1].fv_id : -1};

    }

    // 추후 다음 커서 아이디도 함께 넣어줌
    return {"userLikeList": userLikeList, "cursorId": -1};

}

export const addOrChangeUserLikeResponseDTO = (data) => {
    return {
        "id": data.fv_id,
        "userId": data.favor_user_id,
        "productId": data.favor_product_id,
        "status": data.favor_status
    };
}

export const getUserHistoryResponseDTO = (data, type) => {
    const historyList = [];

    for (let item of data) {
        historyList.push({
            "salesId": item.sales_id,
            "productId": item.sales_product_id,
            "proudctName": item.product_name,
            "productPrice": item.product_price,
            "productImg": item.product_preview_img,
            "consumerId": item.sales_consumer_id,
            "authorId": item.sales_author_id,
            "authorNickname": item.product_author_nickname,
            "reviewStatus": item.review_status
        })
    }

    return {
        "type": parseInt(type),
        "historyList": historyList
    };
}

export const updateUserInfoResponseDTO = (data) => {
    return {
        "userId": data.user_id,
        "userNickname": data.user_nickname,
        "userIntroduce": data.user_introduce,
        "userProfile": data.user_profile
    };
}

export const getUserInfoResponseDTO = (data) => {
    return {
        "userId": data.user_id,
        "nickname": data.user_nickname,
        "profile": data.user_profile,
        "introduce": data.user_introduce,
        "rate": data.user_rate
    };
}

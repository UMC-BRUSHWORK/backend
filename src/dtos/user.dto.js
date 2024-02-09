
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
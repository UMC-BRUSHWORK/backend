
export const getUserLikeListResponseDTO = (data) => {

    const userLikeList = [];

    for (let i = 0; i < data.length; i++) {
        userLikeList.push({
            "fv_id": data[i].fv_id,
            "userId": data[i].favor_user_id,
            "status": data[i].favor_status,
            "productId": data[i].favor_product_id,
            "productName": data[i].product_name,
            "productAuthor": data[i].product_author_nickname
        })
    }

    // 추후 다음 커서 아이디도 함께 넣어줌
    return {"userLikeList": userLikeList, "cursorId": data[data.length-1].fv_id};
}

export const addOrChangeUserLikeResponseDTO = (data) => {
    return {
        "id": data.fv_id,
        "userId": data.favor_user_id,
        "productId": data.favor_product_id,
        "status": data.favor_status
    };
}

export const getUserHistoryResponseDTO = (consume, auth) => {

    const consumeList = [];
    const authList = [];

    for(let i = 0; i < consume.length; i++) {
        consumeList.push({
            "sales_id" : consume[i].sales_id,
            "sales_product_id" : consume[i].sales_product_id,
            "sales_author_id" : consume[i].sales_author_id,
            "productName": consume[i].product_name,
            "productAuthor": consume[i].product_author_nickname
        })
    }

    for(let k = 0; k < auth.length; k++) {
        authList.push({
            "sales_id" : auth[k].sales_id,
            "sales_product_id" : auth[k].sales_product_id,
            "sales_consume_id" : auth[k].sales_consume_id,
            "productName": auth[k].product_name,
            "productAuthor": auth[k].product_author_nickname
        })
    }
    return {"consumeList": consumeList, "consume_cursorId": consume[consume.length-1].sales_id, "authList": authList, "auth_corsorId" :auth[auth.length-1].sales_id};
}

export const getUserHistoryOneResponseDTO = (data, n) => {
    const consumeList = [];
    const authList = [];

    if(n == 1){
        for(let i = 0; i < data.length; i++) {
            consumeList.push({
                "sales_id" : data[i].sales_id,
                "sales_product_id" : data[i].sales_product_id,
                "sales_author_id" : data[i].sales_author_id,
                "productName": data[i].product_name,
                "productAuthor": data[i].product_author_nickname
            })
        }

        return {"consumeList": "구매목록", consumeList, "authList" : "","corsorId" :data[data.length-1].sales_id};
    }

    if(n == 2){
        for(let i = 0; i < data.length; i++) {
            authList.push({
                "sale_number" : i+1,
                "sales_id" : data[i].sales_id,
                "sales_product_id" : data[i].sales_product_id,
                "sales_consume_id" : data[i].sales_consume_id,
                "productName": data[i].product_name,
                "productAuthor": data[i].product_author_nickname
            })
        }

        return {"consumeList": "", "authList" : "판매목록",  authList, "corsorId" :data[data.length-1].sales_id};
    }
}

import moment from "moment";

// 작품 등록, 작품 정보, 작품 수정 조회 (일반적으로 특정 작품 응답 시 사용하는 DTO)
export const productCommonResponseDTO = (data, category) => {

    const categoryList = [];
    const imageList = (data.p_img).split(',');

    for (let i = 0; i < category.length; i++) {
        categoryList.push({
            [category[i].pc_category_id] : category[i].category_name
        });
    }

    return {
        "productId": data.product_id, 
        "title": data.product_name,
        "authorId": data.product_author_id,
        "authorNickname": data.product_author_nickname,
        "status": data.product_status,
        "price": data.product_price,
        "description": data.product_description,
        "delivery": data.product_delivery,
        "hashtag": data.product_hashtag,
        "image": imageList,
        "createdAt": moment.utc(data.created_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
        "favor": data.favor_count,
        "category": categoryList
    };
}

// 작품 목록 조회
export const getProductListResponseDTO = (data) => {

    const productList = [];

    for (let i = 0; i < data.length; i++) {
        productList.push({
            "productId": data[i].product_id,
            "title": data[i].product_name,
            "authorId": data[i].product_author_id,
            "authorNickname": data[i].product_author_nickname,
            "image": (data[i].p_img.split(','))[0],
            "status": data[i].product_status    // 상태 추가
        })
    }

    return {
        "categoryData": productList, 
        "cursorId": data[data.length-1].product_id
    };
}

export const dealProductResponseDTO = (data) => {
    return {
        "salesId": data
    };
}
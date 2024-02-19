import moment from "moment";

// 후기 작성 완료 응답
export const reviewResponseDTO = (data) => {
    return {
        "reviewId": data
    };
}

// 후기 내용 조회
export const reviewContentResponseDTO = (data) => {
    return {
        "reviewId": data.review_id,
        "productId": data.review_product_id,
        "consumerId": data.review_consumer_id,
        "consumerNickname": data.user_nickname,
        "context": data.review_context,
        "rate": data.review_rate,
        "status": data.review_status,
        "date": moment.utc(data.created_at).add(9, 'h').format('YYYY-MM-DD HH:mm:ss')
    };
}

// 후기 목록 조회
export const getReviewListResponseDTO = (data) => {
    
    const reviewList= [];
    let cursorId = -1;

    for (let i = 0; i < data.length; i++) {
        reviewList.push({
            "reviewId": data[i].review_id,
            "productId": data[i].review_product_id,
            "consumerId": data[i].review_consumer_id,
            "consumerNickname": data[i].user_nickname,
            "context": data[i].review_context,
            "date": moment.utc(data[i].created_at).add(9, 'h').format('YYYY-MM-DD HH:mm:ss')
        })
    }

    if(data.length){
        cursorId = data[data.length-1].review_id;
    }

    return {
        "reviewListData": reviewList, 
        "cursorId": cursorId
    };
}

export const getUserReviewListResponseDTO = (data) => {
    
    const reviewList= [];
    let cursorId = -1;

    // 작가명, 작품 이미지, 작가 아이디
    for (let item of data) {
        reviewList.push({
            "reviewId": item.review_id,
            "productId": item.review_product_id,
            "productName": item.product_author_id,
            "productImage": item.product_preview_img,
            "authorId": item.product_author_id,
            "authorNickname": item.product_author_nickname,
            "consumerId": item.review_consumer_id,
            "consumerNickname": item.user_nickname,
            "context": item.review_context,
            "date": moment.utc(item.created_at).add(9, 'h').format('YYYY-MM-DD HH:mm:ss')
        })
    }

    if(data.length){
        cursorId = data[data.length-1].review_id;
    }

    return {
        "reviewListData": reviewList, 
        "cursorId": cursorId
    };
}
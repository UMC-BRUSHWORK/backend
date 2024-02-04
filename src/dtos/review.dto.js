// 후기 데이터
export const reviewResponseDTO = (data) => {

    return {"null": data};

    // return {
    //     "review_id": data[0].review_id, 
    //     "review_product": data[0].review_product, 
    //     "review_context": data[0].review_context, 
    //     "review_rate": data[0].review_rate, 
    //     "cursorId": data[data.length-1].review_id
    // };
}

// 후기 목록 조회
export const getReviewListResponseDTO = (data, review) => {
    const reviews = [];

    for (let i = 0; i < reviews.length; i++) {
        reviews.push({
            'review_id': review[i].review_id,
            'image': review[i].image,
            'review_product': review[i].review_product,
            "review_context": review[i].review_context, 
            'created_at': review[i].created_at,
        })
    }

    return {
        "reviewData": reviews, 
        "cursorId": data[data.length-1].review_id
    };
}
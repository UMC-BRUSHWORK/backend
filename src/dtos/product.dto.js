// 날짜
const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}

// 작품 등록
export const registerResponseDTO = (data, category, tag) => {
    return {
        "productId": data[0].productId, 
        "title": data[0].product_name, 
        "SelectedCategory": productCategory, 
        "SelectedTag": productTag, 
        "cursorId": data[data.length-1].productId
    };
}

// 작품 정보 수정
export const editResponseDTO = (data) => {
    return {
        "productId": data[0].productId, 
        "title": data[0].product_name, 
        "SelectedCategory": productCategory, 
        "SelectedTag": productTag, 
        "cursorId": data[data.length-1].productId
    };
}

// 작품 정보 조회
export const getProductInfoResponseDTO = (data) => {
    return {
        "productData": data[0].productId, 
        "title": data[0].product_name, 
        "SelectedCategory": productCategory, 
        "SelectedTag": productTag, 
        "cursorId": data[data.length-1].productId
    };
}

// 작품 목록 조회
export const getProductListResponseDTO = (data, category) => {
    const productCategory = [];

    for (let i = 0; i < tag[0].length; i++) {
        productTag.push(tag[0][i].p_tags_name);
    }

    const productTag = [];
    
    for (let i = 0; i < category[0].length; i++) {
        productCategory.push(category[0][i].p_category_name);
    }
    
    const products = [];

    for (let i = 0; i < category.length; i++) {
        products.push({
            'productId': category[i].productId,
            'image': category[i].image,
            'title': category[i].title,
            'price': category[i].price,
        })
    }

    return {
        "categoryData": products, 
        "cursorId": data[data.length-1].productId
    };
}

// 작품 수요 조회
export const getProductLikeResponseDTO = (data) => {
    return {
        "userData": data[0].userId, 
        "favorCount": data[0].favorCount, 
    };
}
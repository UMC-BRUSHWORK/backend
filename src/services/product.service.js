import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { registerResponseDTO, editResponseDTO } from "../dtos/product.dto"
import { addProduct, getProduct, getProductCategoryToProductID, getProductTagToProductID, setCategory, setTag } from "../models/product.dao";

// 작품 등록
export const joinProduct = async (body) => {
    const createdAt = new Date(body.createYear, body.createMonth, body.createDay, body.createTime);
    
    const category = body.category;
    const tag = body.tag;

    const joinProductData = await addProduct({
        'productId': body.productId,
        'image': body.image,
        'title': body.title,
        'price': body.price,
        'delivery': body.delivery,
        'details': body.details,
        'createdAt': createdAt        
    });

    // productId 중복 불가
    if(joinProductData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        // 작품 카테고리 매핑
        for (let i = 0; i < category.length; i++) {
            await setCategory(joinProductData, category[i]);
        }
        // 작품 태그 매핑
        for (let i = 0; i < tag.length; i++) {
            await setTag(joinProductData, tad[i]);
        }
        return registerResponseDTO(
            await getProduct(joinProductData), 
            await getProductCategoryToProductID(joinProductData),
            await getProductTagToProductID(joinProductData)
        );
    }
}


// 작품 정보 수정
export const rejoinProduct = async (body) => {
    const updatedAt = new Date(body.updateYear, body.updateMonth, body.updateDay, body.updateTime);
    
    // 기존 데이터 가져오기
    const existedProductData = await getProduct(joinProductData);

    // 수정된 데이터
    const rejoinProductData = await modifyProduct({
        'productId': body.productId,
        'image': body.image,
        'title': body.title,
        'price': body.price,
        'delivery': body.delivery,
        'details': body.details,
        'updatedAt': updatedAt        
    });

    // 기존 데이터와의 일치(수정 여부) 확인
    // 
    // 

    if(joinProductData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        // 카테고리 또는 태그가 수정된 경우
        if ( category!=category || tag!=tag ) {
            // 작품 카테고리 매핑
            for (let i = 0; i < category.length; i++) {
                await setCategory(joinProductData, category[i]);
            }
            // 작품 태그 매핑
            for (let i = 0; i < tag.length; i++) {
                await setTag(joinProductData, tad[i]);
            }
        }
        return editResponseDTO(
            await getProduct(joinProductData), 
            await getProductCategoryToProductID(joinProductData),
            await getProductTagToProductID(joinProductData)
        );
    }
}
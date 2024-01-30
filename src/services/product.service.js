import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { compareData } from '../middleware/product.data';

import { registerResponseDTO, editResponseDTO } from "../dtos/product.dto"
import { addProductDB, getProductDB, changeProductDB, getCategoryDB, getTagDB, getProductByProductIdDB, setCategoryDB, setTagDB } from "../models/product.dao";

// 작품 등록
export const joinProduct = async (body) => {
    const createdAt = new Date(body.createYear, body.createMonth, body.createDay, body.createTime);
    
    const category = body.category;
    const tag = body.tag;

    const joinProductData = await addProductDB({
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
        throw new BaseError(status.PRODUCT_ALREADY_EXIST);
    }else{
        // 작품 카테고리 매핑
        for (let i = 0; i < category.length; i++) {
            await setCategoryDB(joinProductData, category[i]);
        }
        // 작품 태그 매핑
        for (let i = 0; i < tag.length; i++) {
            await setTagDB(joinProductData, tag[i]);
        }
        return registerResponseDTO(
            await getProductDB(joinProductData), 
            await getCategoryDB(joinProductData),
            await getTagDB(joinProductData)
        );
    }
}


// 작품 정보 수정
export const rejoinProduct = async (body) => {
    const updatedAt = new Date(body.updateYear, body.updateMonth, body.updateDay, body.updateTime);
    
    // 작품 존재 확인
    const product_db = await getProductByProductIdDB(productId);

    if (product_db.length > 0) {
        // 기존 데이터
        const existedProductData = await getProductDB(joinProductData);

        // 수정된 데이터
        const rejoinProductData = await changeProductDB({
            'productId': body.productId,
            'image': body.image,
            'title': body.title,
            'price': body.price,
            'delivery': body.delivery,
            'details': body.details,
            'updatedAt': updatedAt        
        });

        // 기존 데이터와의 일치(수정 여부) 확인
        const isDataMatch = await compareData(existedProductData, rejoinProductData);

        // 데이터 일치 확인
        if (isDataMatch) {

             // 카테고리 또는 태그가 수정된 경우
            if ( category!=category || tag!=tag ) {
                // 작품 카테고리 매핑
                for (let i = 0; i < category.length; i++) {
                    await setCategoryDB(joinProductData, category[i]);
                }
                // 작품 태그 매핑
                for (let i = 0; i < tag.length; i++) {
                    await setTagDB(joinProductData, tag[i]);
                }
            }
            return editResponseDTO(
                await getProductDB(rejoinProductData), 
                await getCategoryDB(rejoinProductData),
                await getTagDB(rejoinProductData)
            );
        }
        // 데이터 불일치 
    } else {
        throw new BaseError(status.PRODUCT_ALREADY_EXIST);
    }
}
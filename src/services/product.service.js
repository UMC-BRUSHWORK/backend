import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { dealProductResponseDTO, productCommonResponseDTO } from "../dtos/product.dto"
import { addProduct, getProduct, changeProduct, getCategory, getProductByProductId, setCategory, changeCategory, dealProductUpdateDao, dealSalesAddDao } from "../models/product.dao";

// 작품 등록
export const joinProduct = async (body, files) => {

    // imageFiles 변환
    const imageFiles = [];
    for (let i = 0; i < files.length; i++) {
        imageFiles.push(files[i].location);
    }
    const stringFiles = imageFiles.toString();

    // catetory 변환
    const category = (body.category).split(',');

    // 작품 등록
    const joinProductData = await addProduct({
        'title': body.title,        // 제목
        'authorId': parseInt(body.authorId),  // 작가 아이디
        'authorNickname': body.authorNickname,  // 작가 이름
        'delivery': parseInt(body.delivery),  // 배송 방식
        'price': parseInt(body.price),        // 가격
        'details': body.details,    // 상세 설명
        'hashtag': body.hashtag,     // 해시태그 string
        'image': stringFiles        // 사진
    });
    // productId 중복 불가
    if(joinProductData == -1){
        throw new BaseError(status.PRODUCT_ALREADY_EXIST);
    }else{
        // 작품 카테고리 매핑
        await setCategory(joinProductData, category);

        return productCommonResponseDTO(await getProduct(joinProductData), await getCategory(joinProductData));
    }
}

// 작품 정보 수정
export const rejoinProduct = async (params, body, files) => {
    // 작품 존재 확인
    const productId = parseInt(params);
    const product_db = await getProductByProductId(productId);

    // imageFiles 변환
    const imageFiles = [];
    let stringFiles = "";

    if (product_db != -1) {
        // 기존 데이터 (작품 데이터 & 카테고리)
        const previous = await getProduct(productId);
        const cat = await getCategory(productId);
        let previousCat = [];
        for (let i = 0; i < cat.length; i++) {
            previousCat.push(cat[i].pc_category_id);
        }

        if (files) {
            for (let i = 0; i < files.length; i++) {
                imageFiles.push(files[i].location);
            }
            stringFiles = imageFiles.toString();
        
        }else{
            // 이미지 추가 안했을 때, 기존 이미지 사용
            stringFiles = previous.p_img;
        }
        
        // 수정된 데이터
        // 수정 가능 데이터 -> 사진, 작품명, 가격, 배송 방식, 상세 설명, 해시태그
        const rejoinProduct = await changeProduct(productId, {
            'images': stringFiles,
            'title': body.title,
            'price': parseInt(body.price),
            'delivery': parseInt(body.delivery),
            'detail': body.details,
            'hashtag': body.hashtag
        });

        // 카테고리 수정
        let afterCat = ((body.category).split(',')).map(Number);

        const dup = previousCat.filter(x1 => afterCat.some(x2 => x1 == x2));
        previousCat = previousCat.filter(x => !dup.includes(x));
        afterCat = afterCat.filter(x => !dup.includes(x));

        const catResult = await changeCategory(productId, previousCat, afterCat);

        // 모두 다 업데이트 잘 되었으면
        if (catResult && rejoinProduct) {
            return productCommonResponseDTO(await getProduct(productId), await getCategory(productId));
        }else{
            // 잘못 입력했을 때
            throw new BaseError(status.INFO_NOT_EXIST);
        }
    } else {
        // 잘못 입력했음
        throw new BaseError(status.INFO_NOT_EXIST);
    }
}

// 작품 거래 상태 변경 (거래 성사)
export const dealProduct = async (body) => {
    const { productId, consumerId, authorId } = body;

    await dealProductUpdateDao(productId, consumerId);
    const result = await dealSalesAddDao(productId, consumerId, authorId);

    return dealProductResponseDTO(result);
}
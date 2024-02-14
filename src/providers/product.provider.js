import { getProductInfoResponseDTO, getProductListResponseDTO, getProductLikeResponseDTO } from "../dtos/product.dto";
import { getProduct, getCategory, getTag, getLikeCount } from "../models/product.dao";

// 작품 정보 조회
export const joinProductInfo = async () => {

    return getProductInfoResponseDTO(await getProduct());
}

// 작품 카테고리 및 태그 조회
export const joinProductCategory = async (categoryId, query) => {

    const {paging = 3, cursorId = -1} = query;

    console.log(categoryId, cursorId, paging);

    return getProductListResponseDTO(await getCategory(parseInt(categoryId), parseInt(cursorId), parseInt(paging)));
}
export const joinProductTag = async (tagId, query) => {

    const {paging = 3, cursorId = -1} = query;

    console.log(tagId, cursorId, paging);

    return getProductListResponseDTO(await getTag(parseInt(tagId), parseInt(cursorId), parseInt(paging)));
}

// 작품 수요 조회
export const joinProductLike = async () => {
    return getProductLikeResponseDTO(await getLikeCount());
}
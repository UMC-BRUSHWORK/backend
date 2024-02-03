import { getProductInfoResponseDTO, getProductListResponseDTO, getKeywordResponseDTO } from "../dtos/product.dto";
import { getProduct, getCategory, getKeyword } from "../models/product.dao";

// 작품 정보 조회
export const joinProductInfo = async () => {

    return getProductInfoResponseDTO(await getProduct());
}

// 작품 목록 조회
export const joinProductList = async (categoryId, query) => {

    const {paging = 3, cursorId = -1} = query;

    console.log(categoryId, cursorId, paging);

    return getProductListResponseDTO(await getCategory(parseInt(categoryId), parseInt(cursorId), parseInt(paging)));
}

// 작품 검색 조회
export const joinProductekeyword = async (keywordId, query) => {

    const {paging = 3, cursorId = -1} = query;

    console.log(keywordId, cursorId, paging);

    return getKeywordResponseDTO(await getKeyword(parseInt(keywordId), parseInt(cursorId), parseInt(paging)));
}
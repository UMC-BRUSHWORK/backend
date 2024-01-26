import { getProductInfoResponseDTO, getProductListResponseDTO } from "../dtos/product.dto";
import { getProductInfoToDB, getProductListToDB } from "../models/product.dao";

// 작품 정보 조회
export const joinProductInfo = async () => {

    return getProductInfoResponseDTO(await getProductInfoToDB());
}

// 작품 목록 조회
export const joinProductList = async (categoryId, query) => {

    const {paging = 3, cursorId = -1} = query;

    console.log(categoryId, cursorId, paging);

    return getProductListResponseDTO(await getProductListToDB(parseInt(categoryId), parseInt(cursorId), parseInt(paging)));
}
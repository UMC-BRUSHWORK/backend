import { getProductListResponseDTO, productCommonResponseDTO } from "../dtos/product.dto";
import { getCategory, getKeyword, getProduct, getProductListToDB} from "../models/product.dao";

// 작품 정보 조회
export const joinProductInfo = async (productId) => {
    return productCommonResponseDTO(await getProduct(parseInt(productId)), await getCategory(parseInt(productId)));
}

// 작품 목록 조회
export const joinProductList = async (query) => {
    const { paging = 3, cursorId = -1, keyword = "" } = query;
    return getProductListResponseDTO(await getProductListToDB(parseInt(cursorId), parseInt(paging), keyword));
}

// 작품 검색 조회
export const joinProducteKeyword = async (query) => {

    const {paging = 3, cursorId = -1, keyword} = query;

    console.log(keyword, cursorId, paging);

    return getKeywordResponseDTO(await getKeyword(keyword, parseInt(cursorId), parseInt(paging)));
}
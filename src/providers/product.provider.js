import { getKeywordResponseDTO, getProductListResponseDTO, productCommonResponseDTO } from "../dtos/product.dto";
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
export const joinProductKeyword = async (query) => {

    const {paging = 3, cursorId = -1, keyword} = query;

    const data = await getKeyword(keyword, parseInt(cursorId), parseInt(paging));
    const result = data.filter((arr, index, cb) => index === cb.findIndex(t => t.product_id === arr.product_id));

    result.sort((a, b) => {
        if (a.product_id < b.product_id) return -1;
        if (a.product_id > b.product_id) return 1;
        return 0;
    })

    return getKeywordResponseDTO(result);
}
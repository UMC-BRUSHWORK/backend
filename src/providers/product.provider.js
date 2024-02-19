import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { getKeywordResponseDTO, getProductListResponseDTO, productCommonResponseDTO, searchCategoryResponseDTO } from "../dtos/product.dto";
import { getCategory, getKeyword, getKeywordAuth, getProduct, getProductListToAuthDB, getProductListToDB, searchCategoryAuthDao, searchCategoryDao} from "../models/product.dao";

// 작품 정보 조회
export const joinProductInfo = async (productId) => {
    return productCommonResponseDTO(await getProduct(parseInt(productId)), await getCategory(parseInt(productId)));
}

// 작품 목록 조회
export const joinProductList = async (query) => {
    const { paging = 3, cursorId = -1, author = "", userId } = query;
    let result;

    if(userId){
        result = await getProductListToAuthDB(parseInt(userId), parseInt(cursorId), parseInt(paging), parseInt(author))
    }else{
        result = await getProductListToDB(parseInt(cursorId), parseInt(paging), parseInt(author));
    }

    if(result.length < 0){
        throw new BaseError(status.RESULT_NOT_FOUND);
    }

    return getProductListResponseDTO(result);
}

// 작품 검색 조회
export const joinProductKeyword = async (query) => {

    const {paging = 3, cursorId = -1, keyword, userId} = query;
    let data, result;

    if(userId){
        data = await getKeywordAuth(keyword, parseInt(cursorId), parseInt(paging), parseInt(userId));
        result = data.filter((arr, index, cb) => index === cb.findIndex(t => t.product_id === arr.product_id));
    }else{
        data = await getKeyword(keyword, parseInt(cursorId), parseInt(paging));
        result = data.filter((arr, index, cb) => index === cb.findIndex(t => t.product_id === arr.product_id));
    }

    if(result.length == 0){
        throw new BaseError(status.RESULT_NOT_FOUND);
    }

    result.sort((a, b) => {
        if (a.product_id < b.product_id) return -1;
        if (a.product_id > b.product_id) return 1;
        return 0;
    })

    return getKeywordResponseDTO(result);
}

// 작품 카테고리 검색
export const searchCategoryProvider = async (query) => {

    const { categoryId, cursorId = -1, paging = 5 , userId} = query;
    let result;

    if(userId){
        result = await searchCategoryAuthDao(parseInt(categoryId), parseInt(cursorId), parseInt(paging), parseInt(userId));

    }else{
        result = await searchCategoryDao(parseInt(categoryId), parseInt(cursorId), parseInt(paging));
    }

    if(result.length < 0){
        throw new BaseError(status.RESULT_NOT_FOUND);
    }

    return searchCategoryResponseDTO(result);
}
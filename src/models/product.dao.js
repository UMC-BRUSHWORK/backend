// db 연결
import { pool } from "../../config/db.connect";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { insertProductSql, getProductIdSql, getCategoryIdSql, connectProductCategorySql, updateProductInfoSql, isExistProduct, getCategoryItem, updateCategorySql, selectProductList, countProduct, updateProductDealSql, insertSalesSql } from "./product.sql.js";

// 작품 존재 확인
export const getProductByProductId = async (productId) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(isExistProduct, productId);
    
        conn.release();

        if(!(confirm.length)){
            return -1;
        }else{
            return confirm[0].product_id;
        }
    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}

// 작품 등록(추가)
export const addProductDB = async (data) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertProductSql,
            [ data.title, data.authorId, data.authorNickname, data.delivery,
                data.price, data.details, data.hashtag, data.authorId, data.image]);

        conn.release();
        return result.insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 정보 조회
export const getProductDB = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const [product] = await pool.query(getProductIdSql, productId);

        if(!product.length){
            return -1;
        }

        conn.release();
        return product[0];
        
    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 카테고리 조회
export const getCategory = async (productId) => {
    try {
        const conn = await pool.getConnection();
    
        const [result] = await pool.query(getCategoryIdSql, productId);
        
        conn.release();
        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 정보 수정
export const changeProduct = async (productId, data) => {
    try{
        const conn = await pool.getConnection();

        await pool.query(updateProductInfoSql, [
            data.images, data.title, data.price, data.delivery, data.detail, data.hashtag,
            productId
        ]);

        conn.release();
        return 1;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 카테고리 추가
export const setCategory = async (productId, category) => {
    try {
        const conn = await pool.getConnection();

        for (let i = 0; i < category.length; i++) {
            await pool.query(connectProductCategorySql, [productId, category[i]]);
        }

        conn.release();
        return 1;
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 검색 조회
export const getKeyword = async (keyword, cursorId, paging) => {
    try {
        const conn = await pool.getConnection();
        let keywordList = new Set();

        if(cursorId == -1){
            const [temp] = await pool.query(countProduct);
            cursorId = temp[0].productCursor + 1;
        }
        console.log("-----DAO-----");
        console.log(keyword, cursorId, paging);

        const [temp1] = await pool.query(getKeywordTitleSql, [keyword, cursorId, paging]);
        const [temp2] = await pool.query(getKeywordDescriptionSql, [keyword, cursorId, paging]);
        const [temp3] = await pool.query(getKeywordHashtagSql, [keyword, cursorId, paging]);

        console.log(temp1);
        console.log(temp2);
        console.log(temp3);
        console.log("-----DAO-----");
        
        conn.release();

        return 1;
    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const changeCategory = async (productId, changeList, addList) => {
    try {
        const conn = await pool.getConnection();

        // 비활성화 할 카테고리
        for (let i = 0; i < changeList.length; i++) {
            let [temp] = await pool.query(getCategoryItem, [productId, changeList[i]]);
            await pool.query(updateCategorySql, [!(temp[0].pc_status), productId, changeList[i]]);
        }

        // 추가해야 하는 카테고리
        for (let i = 0; i < addList.length; i++) {
            await pool.query(connectProductCategorySql, [productId, addList[i]]);
        }

        conn.release();
        
        return 1;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getProductListToDB = async (cursorId, paging, keyword) => {
    try {
        const conn = await pool.getConnection();

        if(cursorId == -1){
            const [temp] = await pool.query(countProduct);
            cursorId = temp[0].productCursor + 1;
        }

        // 작품 리스트 - 커서 아이디, paging 사이즈
        // if(keyword == ""){   // 추후 검색 진행 시
        const [product_list] = await pool.query(selectProductList, [cursorId, paging]);
        conn.release();
        return product_list;    

    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// --- 작품 거래 상태 변경(거래 성사)
export const dealProductUpdateDao = async (productId, consumerId) => {
    try {
        const conn = await pool.getConnection();
        await pool.query(updateProductDealSql, [consumerId, productId]);

        conn.release();
        return;
    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const dealSalesAddDao = async (productId, consumerId, authorId) => {
    try {
        const conn = await pool.getConnection();
        const [product] = await pool.query(insertSalesSql, [productId, consumerId, authorId]);

        conn.release();
        return product.insertId;
        
    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
// --- 작품 거래 상태 변경(거래 성사)

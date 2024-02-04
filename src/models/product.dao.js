// db 연결
import { pool } from "../../config/db.connect";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { insertProductSql, getProductIdSql, getCategoryIdSql, getTagIdSql, connectProductCategorySql, connectProductTagSql, confirmProductIdSql, updateProductInfoSql, isExistProduct, getCategoryItem, updateCategorySql, selectProductList, countProduct, updateProductDealSql, insertSalesSql } from "./product.sql.js";

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
    } catch (err) {
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
        if(1){
            const [product_list] = await pool.query(selectProductList, [cursorId, paging]);
            conn.release();
            return product_list;    
        }else{
            // 검색!!! -> 검색 기준 이런거 물어봐야겠음
        }


    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

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
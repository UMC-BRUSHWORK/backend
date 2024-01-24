// db 연결
import { pool } from "../../config/db.config";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { confirmProductId, insertProductSql, getProductId, connectProductCategory, connectProductTag, getCategoryToProductId, getTagToProductId } from "./product.sql.js";

// 작품 데이터 삽입
export const addProduct = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const [confirm] = await pool.query(confirmProductId, data.productId);

        if(confirm[0].isExistProductId){
            conn.release();
            return -1;
        }

        const result = await pool.query(insertProductSql, [body.productId, body.image, body.title, body.price, body.delivery, body.details, createdAt, updatedAt]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 정보 얻기
export const getProduct = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const [product] = await pool.query(getProductId, productId);

        console.log(product);

        if(product.length == 0){
            return -1;
        }

        conn.release();
        return product;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 카테고리 매핑
export const setCategory = async (productId, productCategoryId) => {
    try {
        const conn = await pool.getConnection();
        
        await pool.query(connectProductCategory, [productCategoryId, productId]);

        conn.release();
        
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);

    }
}

// 작품 태그 매핑
export const setTag = async (productId, productTagId) => {
    try {
        const conn = await pool.getConnection();
        
        await pool.query(connectProductTag, [productTagId, productId]);

        conn.release();
        
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);

    }
}

// 작품 카테고리 반환
export const getProductCategoryToProductID = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const category = await pool.query(getCategoryToProductId, productId);

        conn.release();

        return category;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 태그 반환
export const getProductTagToProductID = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const tag = await pool.query(getTagToProductId, productId);

        conn.release();

        return category;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 정보 반환
export const getProductInfoToDB = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const productInfo = await pool.query(getProductInfoToProductId, productId);

        conn.release();

        return productInfo;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 목록 반환
export const getProductListToDB = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const productList = await pool.query(getProductListToProductId, productId);

        conn.release();

        return productList;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

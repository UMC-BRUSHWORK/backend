// db 연결
import bodyParser from "body-parser";
import { pool } from "../../config/db.config";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { insertProductSql, getProductIdSql, getCategoryIdSql, getTagIdSql, connectProductCategorySql, connectProductTagSql, confirmProductIdSql, updateProductInfoSql } from "./product.sql.js";

// 작품 존재 확인
export const getProductByProductId = async (productId) => {
    const [confirm] = await pool.query(confirmProductIdSql, productId);

    if(confirm[0].isExistProductId){
        throw new BaseError(status.PRODUCT_ALREADY_EXIST);
    }
}

// 작품 등록(추가)
export const addProduct = async (data) => {
    try{
        const conn = await pool.getConnection();

        // 필수 정보
        if(!(image || preview || title || price || details)) {
            throw new BaseError(status.INFO_NOT_EXIST);
            return -1;
        }

        if(getProductByProductId){
            return -1;
        }

        const result = await pool.query(insertProductSql, [body.productId, body.image, body.preview, body.title, body.price, body.delivery, body.details, createdAt, updatedAt]);

        conn.release();
        return result[0].productId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 정보 조회
export const getProduct = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const [product] = await pool.query(getProductIdSql, productId);

        console.log(product);

        if(product.length == 0){
            return -1;
        }

        conn.release();
        return productId;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 카테고리 및 태그 조회
export const getCategory = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const category = await pool.query(getCategoryIdSql, productId);

        conn.release();

        return category;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
export const getTag = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const tag = await pool.query(getTagIdSql, productId);

        conn.release();

        return tag;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 정보 수정
export const changeProduct = async (data) => {
    try{
        const conn = await pool.getConnection();

        const update = await pool.query(updateProductInfoSql, [body.productId, body.image, body.preview, body.title, body.price, body.delivery, body.details, createdAt, updatedAt]);

        conn.release();
        return update[0].productId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 작품 카테고리 및 태그 연결
export const setCategory = async (productId, productCategoryId) => {
    try {
        const conn = await pool.getConnection();
        
        await pool.query(connectProductCategorySql, [productCategoryId, productId]);

        conn.release();
        
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
export const setTag = async (productId, productTagId) => {
    try {
        const conn = await pool.getConnection();
        
        await pool.query(connectProductTagSql, [productTagId, productId]);

        conn.release();
        
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
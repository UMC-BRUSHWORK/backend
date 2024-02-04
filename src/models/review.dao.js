// db 연결
import { pool } from "../../config/db.connect";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { insertReviewSql, getReviewIdSql, getReviewListIdSql, reviewStatusSql } from "./review.sql.js";

// 후기 등록(추가)
export const addReviewDB = async (productId, userId, reviewRate, reviewContent) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertReviewSql, [productId, userId, reviewContent, reviewRate]);
        
        console.log("addReviewDAO", result);
        
        conn.release();

        return result[0].review_id;
        
    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 후기 내용 조회
export const getReviewDB = async (review_id) => {
    try {
        const conn = await pool.getConnection();
        const [review] = await pool.query(getReviewIdSql, review_id);

        console.log(review);

        if(review.length == 0){
            return -1;
        }

        conn.release();
        return review_id;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 후기 목록 조회
export const getReviewListDB = async (reviewer_id) => {
    try {
        const conn = await pool.getConnection();
        const reviewList = await pool.query(getReviewListIdSql, reviewer_id);

        conn.release();

        return reviewList;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 후기 상태 변경
export const isVisibleDB = async (data) => {
    try{
        const conn = await pool.getConnection();

        const turn_off = await pool.query(reviewStatusSql, [body.review_id, body.review_product, body.review_context, body.review_rate, created_at]);

        conn.release();
        return turn_off[0].review_id;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 후기 목록 연결
export const setReviewListDB = async (review_id, reviewer_id) => {
    try {
        const conn = await pool.getConnection();
        const set = await pool.query(connectProductCategorySql, [reviewer_id, review_id]);

        conn.release();
        
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
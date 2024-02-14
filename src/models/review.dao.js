// db 연결
import { pool } from "../../config/db.connect";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { insertReviewSql, getReviewIdSql, getReviewListIdSql, findExistSalesSql, findAlreadyRegisterReviewSql, getReviewCountSql } from "./review.sql.js";

// 리뷰 등록 ----
// 실제 판매 테이블에 존재하는지 확인
export const findExistSalesDao = async (productId, consumerId) => {
    try{
        const conn = await pool.getConnection();

        const [exist] = await pool.query(findExistSalesSql, [productId, consumerId]);
        conn.release();

        return exist[0].isExist;
        
    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const findAlreadyRegisterReviewDao = async (productId, consumerId) => {
    try{
        const conn = await pool.getConnection();

        const [already] = await pool.query(findAlreadyRegisterReviewSql, [productId, consumerId]);
        conn.release();

        return already[0].isAlreadyRegister;
        
    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 후기 등록(추가)
export const addReviewDB = async (productId, userId, reviewRate, reviewContent) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertReviewSql, [productId, userId, reviewContent, reviewRate]);
                
        conn.release();

        return result.insertId;
    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
// --- 리뷰 등록

// 후기 상세 조회
export const getReviewDB = async (reviewId) => {
    try {
        const conn = await pool.getConnection();
        const [review] = await pool.query(getReviewIdSql, reviewId);
        conn.release();
        return review[0];
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 후기 목록 조회
export const getReviewListDB = async (authorId, cursorId, paging) => {
    try {
        const conn = await pool.getConnection();

        if(cursorId == -1){
            const [temp] = await pool.query(getReviewCountSql);
            cursorId = temp[0].reviewCursor + 1;
        }

        const [reviewList] = await pool.query(getReviewListIdSql, [authorId, cursorId, paging]);

        conn.release();
        return reviewList;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// db 연결
import { pool } from "../../config/db.connect";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { getTosSql, getUserTosSql, insertTosSql, updateTosInfoSql } from "./tos.sql.js";

// 약관 리스트
export const getTos = async () => {
    try{
        const conn = await pool.getConnection();
        const [result] = await pool.query(getTosSql);

        conn.release();
        return result;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 약관 리스트
export const getTosUserListDao = async (userId) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await pool.query(getUserTosSql, userId);

        conn.release();
        return result;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 약관 등록
export const addTos = async (data) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await pool.query(insertTosSql, [body.tosId, body.userId, body.agree]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 약관 동의 수정
export const changeTos = async (utId, agree) => {
    try{
        const conn = await pool.getConnection();

        await pool.query(updateTosInfoSql, [agree, utId]);
        
        conn.release();
        return utId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
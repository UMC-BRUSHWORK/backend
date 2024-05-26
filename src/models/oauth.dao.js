import { pool } from "../../config/db.connect";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { getUserByKakaoSql, getUserByGoogleSql } from "./oauth.sql";

// 카카오
export const getUserByKakao = async (kakaoAcc) => {
    try {
        const conn = await pool.getConnection();

        const [result] = await pool.query(getUserByKakaoSql, kakaoAcc);
        console.log('inpool', null, result);
        
        conn.release();
        
        return result;

    }catch (err) {
        console.error('inpool', null, err);
        conn.release();
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 구글
export const getUserByGoogle = async (googleAcc) => {
    try {
        const conn = await pool.getConnection();

        const [result] = await pool.query(getUserByGoogleSql, googleAcc);
        console.log('inpool', null, result);
        
        conn.release();
        
        return result;

    }catch (err) {
        console.error('inpool', null, err);
        conn.release();
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};
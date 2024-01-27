import { pool } from "../../config/db.connect";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { getUserByIDSql, getUserSql, updateAccessTime, getEmailByName } from "./auth.sql";

export const getUserByEmail = async (email) => {
    try {
        const conn = await pool.getConnection();

        const [result] = await pool.query(getUserSql, email);
        console.log('ok', null, result);
        
        conn.release();
        
        return result;

    }catch (err) {
        conn.release();
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 접속 시간 업데이트
export const updateAccess = async (userId) => {
    try {
        const conn = await pool.getConnection();

        await pool.query(updateAccessTime, userId);
        const [result] = await pool.query(getUserByIDSql, userId);

        conn.release();
        return result[0];
    } catch (err) {
        conn.release();
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getUserByName = async (name) =>{
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(getEmailByName, name);

        conn.release();

        return result;
    }catch (err) {
        conn.release();
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
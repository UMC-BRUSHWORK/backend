import { pool } from "../../config/db.connect";

import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { createUserSql, getUserByIDSql, getUserSql, updateAccessTime, updateUserStatus,  getEmailByphoneSql, getNicknameSql, getUser, changeToSleepUser, changeToActiveUser } from "./auth.sql.js";

export const getUserByEmail = async (email) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await pool.query(getUserSql, email);
        
        conn.release();
        
        return result;
    }catch (err) {
        console.error(err);
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
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getUserByPhone = async (phone) =>{
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(getEmailByphoneSql, phone);

        conn.release();

        return result;
    }catch (err) {
        console.error('inpool', null, err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 닉네임으로 사용자 얻기
export const getUserByNickname = async (nickname) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await pool.query(getNicknameSql, nickname);

        conn.release();
        return result;
        // return results.length > 0 ? results[0] : null;
    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 사용자 생성
export const createUser = async (req_email, req_password, req_name, req_nickname, req_phone) => {
    try {
        const conn = await pool.getConnection();

        const [result] = await pool.query(createUserSql, [req_name, req_password, req_email, req_nickname, req_phone]);
        const [results] = await pool.query(getUserByIDSql, result.insertId);
        
        conn.release();
        return results[0];

    } catch (err) {
        console.error('inpool', null, err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const changeStatusByEmail = async (email) =>{
    try{
        const conn = await pool.getConnection();
        const result = await pool.query(updateUserStatus, email);

        conn.release();
        return result;
    } catch (err){
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getUserByEmailAndName = async (a_password, email, name) =>{
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(getUser, [a_password, email, name]);

        conn.release();

        return result;
    } catch (err) {
        conn.release();

        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const changeSleepUser = async (user) => {
    try{    //유저 상태으로 전환
        const conn = await pool.getConnection();
        const result = await pool.query(changeToActiveUser, user.user_id);
        conn.release();
        
        return result
        
    } catch (err) {
        conn.release();
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const changeActiveUser = async (user) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await pool.query(changeToSleepUser, user.user_id);
        conn.release();

        return result;
    } catch (err) {
        conn.release();
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }  
}
// db 연결
import { pool } from "../../config/db.config";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { insertTosSql, confirmTosIdSql, essentialTosIdSql, updateTosInfoSql } from "./tos.sql.js";

// 약관 존재 확인
export const getTosByTosId = async (utId) => {
    const [confirm] = await pool.query(confirmTosIdSql, utId);

    if(confirm[0].isExistTosId){
        throw new BaseError(status.TOS_NOT_EXIST);
    }
}

// 약관 등록
export const addTos = async (data) => {
    try{
        const isEssential = await pool.query(essentialTosIdSql, utId);
        const conn = await pool.getConnection();

        // 필수 약관만
        if (isEssential) {
            if(!( utTosId || utAgree )) {
                throw new BaseError(status.MUST_AGREE);
                return -1;
            }
        }

        if(getTosByTosId){
            return -1;
        }

        const result = await pool.query(insertTosSql, [body.utId, body.utTosId, body.utUserId, body.utAgree, body.createdAt, updatedAt]);

        conn.release();
        return result[0].utId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

/*
// 내 약관 조회
export const getTos = async (utId) => {
    try {
        const conn = await pool.getConnection();
        const [tos] = await pool.query(getTosIdSql, utId);      // getTosIdSql

        console.log(tos);

        if(tos.length == 0){
            return -1;
        }

        conn.release();
        return utId;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
*/

// 약관 동의 수정
export const changeTos = async (data) => {
    try{
        const isEssential = await pool.query(essentialTosIdSql, utId);
        const conn = await pool.getConnection();

        const update = await pool.query(updateTosInfoSql, [body.utId, body.utTosId, body.utUserId, body.utAgree, body.createdAt, updatedAt]);

        // 필수 약관만
        if (isEssential) {
            if(!( utTosId || utAgree )) {
                throw new BaseError(status.MUST_AGREE);
                return -1;
            }
        }
        
        conn.release();
        return update[0].utId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
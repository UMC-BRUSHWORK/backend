// db 연결
import { pool } from "../../config/db.connect";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { addReportSql } from "./report.sql";

export const receiveReport = async (data) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await pool.query(addReportSql, [
            data.reporterId, data.reporteeId, data.status, data.context
        ]);
        
        conn.release();
                
        return result.insertId;

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};
// db 연결
import { pool } from "../../config/db.config";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { insertReportSql, getReportIdSql, confirmReportIdSql } from "./report.sql.js";

// 신고 존재 확인
export const getReportByReportId = async (reportId) => {
    const [confirm] = await pool.query(confirmReportIdSql, reportId);

    if(confirm[0].isExistReportId){
        throw new BaseError(status.REPORT_ALREADY_EXIST);
    }
}

// 신고 접수
export const addReport = async (data) => {
    try{
        const conn = await pool.getConnection();

        // 필수 정보
        if(!( status || context )) {
            throw new BaseError(status.INFO_NOT_EXIST);
            return -1;
        }

        if(getReportByReportId){
            return -1;
        }

        const result = await pool.query(insertReportSql, [body.reportId, body.status, body.reporter, body.reportee, body.context, createdAt]);

        conn.release();
        return result[0].reportId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 신고 내역 조회
export const getReport = async (reportId) => {
    try {
        const conn = await pool.getConnection();
        const [report] = await pool.query(getReportIdSql, reportId);

        console.log(report);

        if(report.length == 0){
            return -1;
        }

        conn.release();
        return reportId;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
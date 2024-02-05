
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { registerResponseDTO } from "../dtos/report.dto"
import { addReport, getReport } from "../models/report.dao";

// 신고 접수
export const joinReport = async (body) => {
    const createdAt = new Date(body.createYear, body.createMonth, body.createDay, body.createTime);
    
    const joinReportData = await addReport({
        'reportId': body.reportId,
        'reportStatus': body.reportStatus,
        'reportERId': body.reportERId,
        'reportEEId': body.reportEEId,
        'reportContext': body.reportContext,
        'createdAt': createdAt        
    });

    // reportId 중복 불가
    if(joinReportData == -1){
        throw new BaseError(status.REPORT_ALREADY_EXIST);
    }else{
        return registerResponseDTO( await getReport(joinReportData) );
    }
}
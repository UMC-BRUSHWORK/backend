import { registerReportResponseDTO } from "../dtos/report.dto"
import { receiveReport } from "../models/report.dao";

// 신고 접수
export const joinReport = async (body) => {
    
    const joinReportData = await receiveReport({
        'reporterId': body.reporterId,
        'reporteeId': body.reporteeId,
        'status': body.status,
        'context': body.context,
    });

    return registerReportResponseDTO(joinReportData);
    
}
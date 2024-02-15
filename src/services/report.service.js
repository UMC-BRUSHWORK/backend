import { registerReportResponseDTO } from "../dtos/report.dto"
import { sendMailToBW } from "../middleware/mail";
import { receiveReport } from "../models/report.dao";

// 신고 접수
export const joinReport = async (body) => {

    const reportData = {
        'reporterId': body.reporterId,
        'reporteeId': body.reporteeId,
        'status': body.status,
        'context': body.context,
    }
    
    console.log(reportData);

    const joinReportData = await receiveReport(reportData);

    sendMailToBW(reportData);   // 신고 메일 전송

    return registerReportResponseDTO(joinReportData);
    
}
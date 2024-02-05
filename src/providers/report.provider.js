import getReportResponseDTO from "../dtos/report.dto";
import getReportToDB from "../models/report.dao";

// 작품 정보 조회
export const joinReport = async () => {
    return getReportResponseDTO(await getReportToDB());
}
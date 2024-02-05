
// 신고 존재 확인
export const confirmReportIdSql = "SELECT EXISTS(SELECT 1 FROM complaint WHERE complaint_id = ?) as isExistreportId";

// 신고 접수
export const insertReportSql = "INSERT INTO complaint (complaint_id, complaint_status, reporter_id, reportee_id, complaint_context, created_at) VALUES (?, ?, ?, ?, ?, ?);";

// 신고 내역 조회
export const getReportIdSql = "SELECT * FROM complaint WHERE complaint_id = ?";

import express from "express";

import newReportController from "../controllers/report.controller.js";

export const reportRouter = express.Router();

// 신고 접수
reportRouter.post('/register', newReportController);

// report.sql.js
// 신고 존재 확인
export const confirmReportIdSql = "SELECT EXISTS(SELECT 1 FROM complaint WHERE complaint_id = ?) as isExistreportId";

// 신고 접수
export const insertReportSql = "INSERT INTO complaint (complaint_id, complaint_status, reporter_id, reportee_id, complaint_context, created_at) VALUES (?, ?, ?, ?, ?, ?);";

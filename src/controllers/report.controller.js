import { BaseError } from "../../config/error";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import joinReport from "../service/report.service.js";
import joinReportDetails from "../provider/report.provider.js";

// 신고 접수 관련 Controller
export const newReportController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinReport(req.body)));
}

// 신고 내역 조회 관련 Controller
export const checkReportDetailsController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinReportDetails(req.body)));
}
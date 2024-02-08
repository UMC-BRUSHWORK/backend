import response from "../../config/response.js";
import status from "../../config/response.status.js";

import joinReport from "../service/report.service.js";

// 신고 접수 관련 Controller
export const newReportController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinReport(req.body)));
}
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { joinReview, rejoinReview } from "../services/review.service.js";
import { joinReviewContent, joinReviewList } from "../providers/review.provider.js";

// 후기 등록 관련 Controller
export const newReviewController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinReview(req.body)));
}

// 후기 상태변경 관련 Controller
export const renewReviewController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await rejoinReview(req.body)));
}

// 후기 내용 조회 관련 Controller
export const getReviewContentController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinReviewContent(req.body)));
}

// 후기 목록 조회 관련 Controller
export const getReviewListController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinReviewList(req.body)));
}
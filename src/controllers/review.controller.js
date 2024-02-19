import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { newReviewService } from "../services/review.service.js";
import { getReviewContentService, getReviewListService, getUserReviewListProvider } from "../providers/review.provider.js";

// 후기 등록 관련 Controller
export const newReviewController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await newReviewService(req.body)));
}

// 후기 내용 조회 관련 Controller
export const getReviewContentController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getReviewContentService(req.params.reviewId)));
}

// 후기 목록 조회 관련 Controller
export const getReviewListController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getReviewListService(req.query)));
}

// 내가 작성한 후기 조회 관련 Controller
export const getUserReviewListController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getUserReviewListProvider(req.params.userId, req.query)));
}
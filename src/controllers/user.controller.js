import { response } from "../../config/response.js";
import { status } from "../../config/response.status"

import { getUserLikeList } from "../providers/user.provider.js";
import { addOrChangeUserLikeCon } from "../services/user.service.js";

export const getUserLike = async (req, res, next) => {
    // 사용자 좋아요 리스트 출력 관련 Controller
    res.send(response(status.SUCCESS, await getUserLikeList(req.params.userId, req.query)));
}

export const addOrChangeUserLike = async (req, res, next) => {
    // 사용자 좋아요 리스트 등록 or 상태 변경(좋아요 해제 또는 재등록) 관련 Controller
    res.send(response(status.SUCCESS, await addOrChangeUserLikeCon(req.params.userId, req.body)));
}
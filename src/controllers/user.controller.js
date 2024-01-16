import { response } from "../../config/response.js";
import { status } from "../../config/response.status"

import { getUserLikeList } from "../providers/user.provider.js";

export const getUserLike = async (req, res, next) => {
    // 사용자 좋아요 리스트 출력 관련 Controller
    res.send(response(status.SUCCESS, await getUserLikeList(req.params.userId, req.query)));
}
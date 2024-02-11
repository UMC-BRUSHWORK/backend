import { response } from "../../config/response.js";
import { status } from "../../config/response.status"

<<<<<<< HEAD
import { getUserLikeList, getUserHistory } from "../providers/user.provider.js";
import { addOrChangeUserLikeCon } from "../services/user.service.js";
=======
import { getUserInfoProvider, getUserLikeList } from "../providers/user.provider.js";
import { addOrChangeUserLikeCon, updateUserInfoService } from "../services/user.service.js";
>>>>>>> develop

export const getUserLike = async (req, res, next) => {
    // 사용자 좋아요 리스트 출력 관련 Controller
    res.send(response(status.SUCCESS, await getUserLikeList(req.params.userId, req.query)));
}

export const addOrChangeUserLike = async (req, res, next) => {
    // 사용자 좋아요 리스트 등록 or 상태 변경(좋아요 해제 또는 재등록) 관련 Controller
    res.send(response(status.SUCCESS, await addOrChangeUserLikeCon(req.params.userId, req.query)));
}

<<<<<<< HEAD
export const getHistory = async (req, res) => {
    res.send(response(status.SUCCESS, await getUserHistory(req.params.userId, req.query)));
=======
export const updateUserInfoController = async (req, res, next) => {
    // 사용자 정보 수정 Controller
    res.send(response(status.SUCCESS, await updateUserInfoService(req.params.userId, req.body, req.file)));
}

export const getUserInfoController = async (req, res, next) => {
    // 사용자 정보 조회 Controller
    res.send(response(status.SUCCESS, await getUserInfoProvider(req.params.userId)));
>>>>>>> develop
}
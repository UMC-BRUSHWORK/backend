import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { joinTos, rejoinTos } from "../service/tos.service.js";

// (회원가입 시)약관 등록 관련 Controller
export const tosController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinTos(req.body)));
}

// (추후 선택)약관 동의(수정) 관련 Controller
export const tosOptionController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await rejoinTos(req.body)));
}
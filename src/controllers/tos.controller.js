import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { joinTos, rejoinTos } from "../services/tos.service.js";
import { getTosListProvider, getTosUserListProvider } from "../providers/tos.provider.js";

// (회원가입 시)약관 등록 관련 Controller
export const tosController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinTos(req.body)));
}

// (추후 선택)약관 동의(수정) 관련 Controller
export const tosOptionController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await rejoinTos(req.params.utId, req.body)));
}

export const tosListController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getTosListProvider()));
}

export const tosUserListController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getTosUserListProvider(req.params.userId)));
}
import { BaseError } from "../../config/error";
import { response } from "../../config/response";
import { status } from "../../config/response.status";

import { loginUser, findEmail } from "../services/auth.service";

export const loginController = async (req, res) => {
    res.send(response(status.SUCCESS, await loginUser(req.body)));
};

export const logoutController = (req, res) => {
    req.session.destroy((err) => {throw new BaseError(status.SESSEION_DELETE_ERR)});
    res.send(response(status.SUCCESS, "로그아웃 성공"))
};

export const findEmailConrtroller = async (req, res) => {
    res.send(response(status.SUCCESS, await findEmail(req.body)));
};
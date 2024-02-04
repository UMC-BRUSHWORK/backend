import { BaseError } from "../../config/error";
import { response } from "../../config/response";
import { status } from "../../config/response.status";

import { findEmail, loginUser, registerService, resignService, changePassword } from "../services/auth.service";


// 로그인
export const loginController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await loginUser(req.body)));
};

// 로그아웃
export const logoutController = (req, res, next) => {
    // req.session.destroy((err) => {throw new BaseError(status.SESSION_DELETE_ERR)});
    res.send(response(status.SUCCESS, "로그아웃 성공"))
};

// 회원 가입
export const registerController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await registerService(req.body)));
}

// 회원 탈퇴
export const resignController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await resignService(req.body)));
}

// Email 찾기
export const findEmailController = async (req, res) => {
    res.send(response(status.SUCCESS, await findEmail(req.body)));
};

// 비밀번호 변경(비밀번호 찾기)
export const  changepasswordController = async (req, res) => {
    res.send(response(status.SUCCESS, await changePassword(req.body)));
}

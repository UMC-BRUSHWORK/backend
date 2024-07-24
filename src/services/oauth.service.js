import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { kakaoLoginResponseDTO } from "../dtos/oauth.dto";
import { createUser, getUserByEmail, updateAccess } from "../models/auth.dao";
import { loginUser } from "./auth.service";

export const kakaoCallbackService = async (code) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: process.env.KAKAO_CALLBACK_URL,
    code: code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const kakaoTokenRequest = await fetch(finalUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8", // 이 부분을 명시하지않으면 text로 응답을 받게됨
    },
  });
  const kakaoTokenJson = await kakaoTokenRequest.json();
  if(!await getUserScopeToKakao(kakaoTokenJson.access_token)) throw new BaseError(status.KAKAO_ERR);

  const userInfo = await getUserInfoToKakao(kakaoTokenJson.access_token);

  // DB에 존재하는지 여부 확인
  const isExist = await getUserByEmail(userInfo.kakao_account.email);
  if(isExist.length){
    // 존재하면 - 로그인
    // const loginUserResult = await loginKakaoUser()
    const loginKakaoResult = await updateAccess(isExist[isExist.length-1].user_id)
    return kakaoLoginResponseDTO(kakaoTokenJson, loginKakaoResult);
  }else{
    // 존재하지 않는다면 - 추가등록
    const createKakaoUserResult = await createUser(userInfo.kakao_account.email, "kakao", userInfo.properties.nickname, userInfo.properties.nickname, "000-0000-0000");
    return kakaoLoginResponseDTO(kakaoTokenJson, createKakaoUserResult);
  }
}

export const kakaoLogoutService = async (token) => {
  const url = 'https://kapi.kakao.com/v1/user/logout';
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });

  return res.json();
}

const getUserScopeToKakao = async (token) => {
  const url = 'https://kapi.kakao.com/v2/user/scopes';
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }
  });

  const result = await res.json();

  if(result.scopes[0].agreed && result.scopes[1].agreed){
    return 1;
  }

  throw new BaseError(status.KAKAO_ERR);

}

const getUserInfoToKakao = async (token) => {
  const url = 'https://kapi.kakao.com/v2/user/me';
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }
  });

  return res.json();
}


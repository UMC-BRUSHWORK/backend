import dotenv from 'dotenv';
import { kakaoCallbackService, kakaoLogoutService } from '../services/oauth.service';
import { response } from '../../config/response';
import { status } from '../../config/response.status';

dotenv.config();    // .env 파일 사용 (환경 변수 관리)

// 카카오
export const kakaoLoginController = async (req, res) => {
  console.log("login");
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_CALLBACK_URL}&response_type=code&scope=account_email,profile_nickname`;
  res.redirect(kakaoLoginUrl);  // kakao로 redirect
}

export const kakaoCallbackController = async (req, res) => {
  const result = await kakaoCallbackService(req.query.code);
  res.send(response(status.SUCCESS, result));
};

// 로그아웃
export const kakaoLogoutController = async (req, res) => {
  const result = await kakaoLogoutService(req.headers.authorization);
  res.send(response(status.SUCCESS, result));
}
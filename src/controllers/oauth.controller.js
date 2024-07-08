import dotenv from 'dotenv';
import { status } from '../../config/response.status';

dotenv.config();    // .env 파일 사용 (환경 변수 관리)

// 카카오
export const kakaoLoginController = async (req, res) => {
  const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
  const config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: "http://localhost:3000/oauth/kakao/callback",
    response_type: "code",
  };

  const params = new URLSearchParams(config).toString();

  const finalUrl = `${baseUrl}?${params}`;
  console.log(finalUrl);

  // const passport = require('passport')
  // const KakaoStrategy = require('passport-kakao').Strategy

  // passport.use('kakao-login', new KakaoStrategy({
  //         clientID: process.env.KAKAO_CLIENT_ID,       // [REST API Key]
  //         callbackURL: '/oauth/kakao/callback',               // [등록한 Redirect URI]
  //     }, async (accessToken, refreshToken, profile, done) => {
  //         console.log(accessToken);
  //         console.log(profile);
  //     }
  //   )
  // )
  return res.redirect(finalUrl);
}

export const kakaoCallbackController = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/oauth/kakao/callback",
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const kakaoTokenRequest = await fetch(finalUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json", // 이 부분을 명시하지않으면 text로 응답을 받게됨
    },
  });
  const json = await kakaoTokenRequest.json();
  console.log(json);

  res.send(JSON.stringify(json)); // 프론트엔드에서 확인하려고
};
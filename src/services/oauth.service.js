import { status } from "../../config/response.status";

export const loginUser = async (body) => {
  const {user_email, user_password, kakao_token, google_token} = body;

  if(kakao_token){
    return kakaoLoginUser(kakao_token);
  }

  if(google_token){
    return googleLoginUser(google_token);
  }

  // 일반
  if (user_email && user_password) {
    return loginWithEmail(user_email, user_password);
  }

  throw new BaseError(status.LOGIN_PARAM_NOT_EXIST);
};

// 기존 auth 함수는 일단 없애둘게요 auth가 있으니까! - 혹시나 없으면 안 되면 말해주세요

const kakaoLoginUser = async (kakao_token) => {
  try {
    const token = verifyKakaoToken(kakao_token);

    let user = await getUserByKakao(kakaoId, 'kakao');
    if (!user) {
      user = await createUser({ user_nickname, social_id: kakaoId, provider: 'kakao' });
    }

    const result = await updateAccess(user.user_id);
    return kakaoLoginResponseDTO(result, token);
  } catch (error) {
    throw new BaseError(status.TOKEN_IS_INVALID);
  }
}

// 구글
const googleLoginUser = async (google_token) => {
  try {
      const token = verifyGoogleIdToken(google_token);
      let user = await getUserByGoogle(googleId, 'google');
      if (!user) {
        user = await createUser({ user_nickname, social_id: googleId, provider: 'google' });
      }

      const result = await updateAccess(user.user_id);
      return googleLoginResponseDTO(result, token);
  } catch (error) {
    throw new BaseError(status.TOKEN_IS_INVALID);
  }
}
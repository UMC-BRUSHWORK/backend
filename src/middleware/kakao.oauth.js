import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const verifyKakaoToken = async (kakao_token) => {
  try {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
          Authorization: `Bearer ${kakao_token}`,
      },
    });
    const user = response.data;
    return user;
  } catch (err) {
    // Handle Kakao token verification error
    console.error('Error verifying Kakao token:', error);
    throw new BaseError(status.TOKEN_IS_INVALID);
  }
}
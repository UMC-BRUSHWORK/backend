import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

const jwt = require('jsonwebtoken');

export const jwtAuthenticationMiddleware = (req, res, next) => {
  const key = process.env.JWT_SECRET_KEY;

  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
    req.decoded = jwt.verify(req.headers.authorization, key);
    return next();
  } catch (error) {
    // 인증 실패
    // 유효시간이 초과된 경우
    if (error.name === "TokenExpiredError") {
      throw new BaseError(status.TOKEN_IS_EXPIRED);
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      throw new BaseError(status.TOKEN_IS_INVALID);
    }
  }
};

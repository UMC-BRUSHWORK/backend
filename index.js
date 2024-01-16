// 패키지들
import express from 'express';
import session from 'express-session';
import SwaggerUi from 'swagger-ui-express';
import SwaggerFile from './swagger-output.json'
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from "jsonwebtoken";


// 응답 관련
import { response } from './config/response.js';
import { BaseError } from './config/error.js';
import { status } from './config/response.status.js';

// route 파일
import { healthRoute } from './src/routes/health.route.js';


dotenv.config();    // .env 파일 사용 (환경 변수 관리)


const app = express();
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')



// server setting - veiw, static, body-parser etc..
app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(session({secret : 'wbrushwork', cookie:{maxAge : 6000 }, resave: false, saveUninitialized: true,}));


app.get('/auth/login', (req,res) => {
    res.sendFile(__dirname + '/login.html')
});  //me


//로그인 기능 구현
app.post('/auth/login', (req,res, next) => {
    const key = process.env.SECRET_KEY;

    const email = req.body.email;
    let nickname =""

    const sql = 'SELECT nickname FROM user WHERE email = ?';
    const values = [email];
    
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('에러 발생:', err);
            // 에러 처리 로직 추가
        } else {
            if (result.length > 0) {
                nickname = result[0].nickname;
                console.log('닉네임:', nickname);

                const token = jwt.sign(
                    {
                        type: "JWT",
                        nickname: nickname,
                    },
                    key,
                    {
                        algorithm: 'HS256',
                        expiresIn: "15m",
                        issuer: "malibu",
                    }
                );
            
                // JWT 토큰을 클라이언트에게 전송
                res.status(200).json({
                    code: 200,
                    message: "토큰이 생성되었습니다",
                    token: token,
                });

            } else {
                console.log('해당 ID에 대한 사용자를 찾을 수 없습니다.');
                // 사용자를 찾지 못한 경우에 대한 처리 로직 추가
            }
        }
    });

});

app.use((req, res, next) => {
    const key = process.env.SECRET_KEY;
    // 인증 완료
    try {
      // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
      req.decoded = jwt.verify(req.headers.authorization, key);
      return next();
    } catch (error) {
      // 인증 실패
      // 유효시간이 초과된 경우
      if (error.name === "TokenExpiredError") {
        return res.status(419).json({
          code: 419,
          message: "토큰이 만료되었습니다.",
        });
      }
      // 토큰의 비밀키가 일치하지 않는 경우
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          code: 401,
          message: "유효하지 않은 토큰입니다.",
        });
      }
    }
  });


// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(SwaggerFile));

// router setting
app.use('/health', healthRoute);    // health check 

// error handling
app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;   
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
    console.error(err);
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});



app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});
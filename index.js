// 패키지들
import express from 'express';
import session from 'express-session';
import SwaggerUi from "swagger-ui-express"
import { specs } from './config/swagger.config.js';
import dotenv from 'dotenv';
import cors from 'cors';




// 응답 관련
import { response } from './config/response.js';
import { BaseError } from './config/error.js';
import { status } from './config/response.status.js';

// route 파일
import { healthRouter } from './src/routes/health.route.js';
import { testRouter } from './src/routes/test.route.js';
import { userRouter } from './src/routes/user.route.js';
import { authRouter } from './src/routes/auth.route.js';


dotenv.config();    // .env 파일 사용 (환경 변수 관리)


const app = express();
const bodyParser = require('body-parser');



// server setting - veiw, static, body-parser etc..
app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(session({secret : 'wbrushwork', cookie:{maxAge : 6000 }, resave: false, saveUninitialized: true,}));
app.use(bodyParser.json());

// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs, {explorer: true}));

// router setting
app.use('/health', healthRouter);    // health check 

app.use('/test', testRouter);       // test
app.use('/user', userRouter);       // user 관련 router
app.use('/auth', authRouter);       // auth 관련 router

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
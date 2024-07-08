const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;  // 패스포트 로컬 전략 모듈
const bcrypt = require("bcrypt");  // 비밀번호 해시 비교를 위한 bcrypt 모듈
const { UserActivation } = require("./models");  // 사용자 데이터를 가져오기 위한 모델

module.exports = () => {
    passport.use(new LocalStorage({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const exUser = await UserActivation.findOne({ where: {email} });
            if (exUser) {
                const result = await hasBrowserCrypto.compare(password, exUser.password)
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.'});
            } 
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
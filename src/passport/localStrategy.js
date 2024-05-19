const passport = require("passport")

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
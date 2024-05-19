import bcrypt from 'bcrypt';

import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

import { generateToken } from '../middleware/jwt';
import { comparePassword } from '../middleware/auth';

import { getUserByEmail, updateAccess } from '../models/oauth.dao';
import { socialLoginResponseDTO } from '../dtos/oauth.dto';

export const socialLoginUser = async(body) => {
    // 구글
    const { OAuth2Client } = require('google-auth-library');
    const { CLIENT_ID, token } = body;

    const a = async function verify() {
        const client = new OAuth2Client(CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        });

        // 추출된 페이로드에 사용자에 대한 정보가 포함되어 있어 암호화 필요? 
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // G Suite 도메인을 요청한 경우:
        // const domain = payload['hd'];
        console.log(userid);
    }
    verify().catch(console.error);
}
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

dotenv.config();

export const generateToken = (user_nickname) => {
    try {
        const token = jwt.sign(
            {
                type: 'JWT',
                user_nickname: user_nickname,
            },
            process.env.JWT_SECRET_KEY,
            {
                algorithm: process.env.JWT_ALGORITHM,
                expiresIn: '1H',
                issuer: "malibu",
            }
        );
        return token;
    } catch (error) {
        // Handle JWT signing error
        console.error('Error generating token:', error);
        throw new BaseError(status.TOKEN_IS_INVALID);
    }
};
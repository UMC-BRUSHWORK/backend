import bcrypt from 'bcrypt';

import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

export const comparePassword = async (inputPassword, hashedPassword) => {
    try {
        console.log("input", inputPassword);
        console.log("hashed", hashedPassword);
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new BaseError(status.LOGIN_PASSWORD_WRONG);
    }
};
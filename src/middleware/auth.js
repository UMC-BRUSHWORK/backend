import bcrypt from 'bcrypt';

import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

export const comparePassword = async (inputPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new BaseError(status.PASSWORD_WRONG);
    }
};

export const maskEmail = async(email) =>{
    const atIndex = email.indexOf('@');
    const visiblePart = email.substring(0, 3);
    const maskedPart = email.substring(3, atIndex).replace(/./g, '*');
    const domain = email.substring(atIndex);
    return visiblePart + maskedPart + domain;
};
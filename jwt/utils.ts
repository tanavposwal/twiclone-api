import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
export const SECRET = 'SECr3t';

export const signToken = (payload: object) => {
    const token = jwt.sign(payload, SECRET, { expiresIn: '24h' });
    return token
};

export const hashPassword = (password: string): string => {
    return crypto.createHash('md5').update(password).digest('hex');
}

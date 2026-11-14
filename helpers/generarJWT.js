import jwt from 'jsonwebtoken';
import config from '../config/config.js'
const { JWT_Secret, JWT_REFRESH_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } = config;

const generarJWT = (token) => {
    return jwt.sign({token}, JWT_Secret, {
        expiresIn: JWT_EXPIRES_IN
    });
};

const generarRefreshToken = (token) => {
    return jwt.sign({token}, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRES_IN
    });
}


export {
    generarJWT,
    generarRefreshToken
}
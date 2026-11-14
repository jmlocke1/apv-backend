import jwt from 'jsonwebtoken';
import config from '../config/config.js'
const { JWT_Secret, JWT_EXPIRES_IN } = config;

const generarJWT = (token) => {
    return jwt.sign({token}, JWT_Secret, {
        expiresIn: JWT_EXPIRES_IN
    });
};


export default generarJWT;
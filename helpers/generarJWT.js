import jwt from 'jsonwebtoken';
import config from '../config/config.js'
const { JWT_Secret } = config;

const generarJWT = (token) => {
    return jwt.sign({token}, JWT_Secret, {
        expiresIn: "30d"
    });
};


export default generarJWT;
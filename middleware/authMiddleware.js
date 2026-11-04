import jwt from "jsonwebtoken";
import config from "../config/config.js";
import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import { deleteUserToken } from "../helpers/generarId.js";
const { JWT_Secret, JWT_MAX_TIME_EXPIRED, JWT_EXPIRES_IN } = config;

const checkAuth = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_Secret);
            req.veterinario = await Veterinario.findOne({ token: decoded.token }).select(
                "-password -confirmado"
            );
            
            return next();
        } catch (error) {
            if(error.name === 'TokenExpiredError') {
                // Decodificamos el payload. Aquí es seguro, ya que se ha verificado la firma
                const payload = jwt.decode(token);
                // Eliminamos el token del usuario
                const veterinario = await Veterinario.findOne({ token: payload.token });
                deleteUserToken(veterinario);
                // Refrescar el token, para más adelante, si lo hago...
                // const tiempoActual = Math.floor(Date.now() / 1000);
                // const tiempoExpirado = tiempoActual - payload.exp;
                // if(tiempoExpirado <= JWT_MAX_TIME_EXPIRED) {
                //     console.log(`Token expirado hace ${tiempoExpirado} segundos. Está dentro del margen y se genera un nuevo token`);
                //     // Generamos un nuevo JWT, limpiando primero los campos de tiempo para que cree otros nuevos
                //     const { iat, exp, nbf, jti, ...datos} = payload;
                //     req.nuevoJWT = jwt.sign(datos, JWT_Secret, {expiresIn: JWT_EXPIRES_IN})
                //     req.veterinario = await Veterinario.findOne({ token: decoded.token }).select(
                //         "-password -confirmado"
                //     );
                // }
            } else {
                const e = new Error("Token no válido");
                res.status(403).json({msg: e.message});
            }
        }
    }
    if(!token) {
        const error = new Error("Token no válido o inexistente");
        res.status(403).json({msg: error.message});
    }
    
    next();
};

export default checkAuth;
import { generarJWT, generarRefreshToken } from "./generarJWT.js";

const generarId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

const addTokenToUser = async (usuario) => {
    const token = generarId();
    const accessToken = generarJWT(token);
    const refreshToken = generarRefreshToken(token);
    
    try {
        usuario.token = token;
        usuario.refreshToken = refreshToken;
        await usuario.save();
    } catch (error) {
        console.log(error);
    }
    return { accessToken, refreshToken };
}

const deleteUserToken = async (usuario) => {
    try {
        if(usuario.token) {
            usuario.token = null;
            usuario.refreshToken = null;
            await usuario.save();
        }
    } catch (error) {
        console.log(error);
    }
}

export {
    generarId,
    addTokenToUser,
    deleteUserToken
}
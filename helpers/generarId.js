const generarId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

const addTokenToUser = async (usuario) => {
    try {
        usuario.token = generarId();
        await usuario.save();
    } catch (error) {
        console.log(error);
    }
    return usuario.token;
}

const deleteUserToken = async (usuario) => {
    try {
        usuario.token = null;
        await usuario.save();
    } catch (error) {
        console.log(error);
    }
}

export {
    generarId,
    addTokenToUser,
    deleteUserToken
}
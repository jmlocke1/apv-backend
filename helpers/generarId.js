const generarId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

const addTokenToUser = async (usuario) => {
    // const token = generarId();
    try {
        usuario.token = generarId();
        await usuario.save();
    } catch (error) {
        console.log(error);
    }
    return usuario.token;
}

export {
    generarId,
    addTokenToUser
}
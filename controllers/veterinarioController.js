import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
    const { nombre, email, password } = req.body;

    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({email});
    if(existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg : error.message });
    }

    try {
        // Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();
        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }
    
};

const perfil = (req, res) => {
    res.json({ msg: "Mostrando perfil"});
};

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({token});
    console.log(usuarioConfirmar);
    if(!usuarioConfirmar) {
        const error = new Error('Token no encontrado');
        return res.status(404).json({msg: error.message})
    }
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({msg: `Usuario confirmado correctamente` });
    } catch (error) {
        console.log(error);
    }
    
};

const autenticar = async (req, res) => {
    const { email } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email});

    if(!usuario) {
        const error = new Error("El Usuario no existe todavía");
        return res.status(404).json({ msg : error.message });
    }

    // Comprobar si el usuario no está confirmado
    
};

export {
    registrar,
    perfil,
    confirmar,
    autenticar
}
import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import { addTokenToUser } from "../helpers/generarId.js";
import { generarId } from "../helpers/generarId.js";
import { quitaBlancosArray } from "../helpers/functionsHelpers.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
    const { nombre, email, password, repetirPassword } = req.body;

    // Validar los datos
    if( quitaBlancosArray([ nombre, email, password, repetirPassword ]).includes('')) {
        return res.status(400).json({msg: 'Hay campos vacíos'});
    }

    if(password !== repetirPassword) {
        return res.status(400).json({msg: 'Los Password no son iguales'});
    }

    if(password.length < 6) {
        return res.status(400).json({msg: 'El Password es muy corto. Debe ser, al menos de 6 caracteres'});
    }

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

        // Enviar el email de confirmación
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

        res.json(veterinarioGuardado);
    } catch (error) {
        return res.status(400).json({msg: error});
    }
    
};

const perfil = (req, res) => {
    if(!req.veterinario) return;
    res.json( req.veterinario );
};

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({token});
    
    if(!usuarioConfirmar || usuarioConfirmar.confirmado) {
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
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email});

    if(!usuario) {
        const error = new Error("El Usuario no existe todavía");
        return res.status(404).json({ msg : error.message });
    }

    // Comprobar si el usuario no está confirmado
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }

    // Revisar el password
    if( await usuario.comprobarPassword(password)) {
        // Autenticar        
        res.json({ token: generarJWT(await addTokenToUser(usuario)) });
    } else {
        const error = new Error('El Password es incorrecto');
        return res.status(403).json({msg: error.message});
    }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;

    const existeVeterinario = await Veterinario.findOne({email});
    if(!existeVeterinario || !existeVeterinario.confirmado) {
        const error = new Error('El Usuario no existe o no está confirmado');
        return res.status(400).json({ msg: error.message });
    }
    
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();

        // Enviar Email con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        });
        res.json({ msg: "Hemos enviado un email con las instrucciones"});
    } catch (error) {
        console.log(error.message);
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token });

    if(tokenValido) {
        // El Token es válido, el usuario existe
        res.json({ msg: "Token válido y el usuario existe"});
    } else {
        const error = new Error('Token no válido');
        return res.status(400).json({ msg: error.message });
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password, repetirPassword } = req.body;

     if(password.length < 6 || repetirPassword.length < 6)  {
        const error = new Error("El Password debe ser mínimo de 6 caracteres");
        return res.status(400).json({msg: error.message});
     }
    if(password !== repetirPassword) {
        const error = new Error("Los Password no son iguales");
        return res.status(400).json({msg: error.message});
    }

    const veterinario = await Veterinario.findOne({ token });
    if(!veterinario) {
        const error = new Error("Hubo un error");
        return res.status(400).json({ msg: error.message });
    }
    

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}
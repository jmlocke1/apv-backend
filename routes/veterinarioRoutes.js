import express from "express";
import { 
    registrar, 
    perfil, 
    cerrarSesion, 
    confirmar, 
    autenticar,
    refrescarToken, 
    olvidePassword, 
    comprobarToken, 
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Área Pública
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
// Otra forma de definir rutas que tengan la misma url
// router.get('/olvide-password/:token', comprobarToken);
// router.post('/olvide-password/:token', nuevoPassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);
router.post('/refresh-token', refrescarToken);


// Área Privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.get('/cerrar-sesion', checkAuth, cerrarSesion);
router.put('/actualizar-password', checkAuth , actualizarPassword);


export default router;
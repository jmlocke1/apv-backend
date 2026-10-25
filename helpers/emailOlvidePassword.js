import nodemailer from "nodemailer";
import config from "../config/config.js";
const { frontDomain, mailHost, mailPort, mailUser, mailPassword } = config;

const emailOlvidePassword = async (datos) => {
    var transport = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        auth: {
            user: mailUser,
            pass: mailPassword
        }
    });

    const { email, nombre, token } = datos;
    // Enviar el email
    const info = await transport.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Restablece tu Password',
        text: 'Restablece tu Password',
        html: `<p>Hola: ${nombre}, has solicitado restablecer tu password</p>
            <p>Sigue el siguiente enlace para generar un nuevo password: <a href="${frontDomain}/olvide-password/${token}">Restablecer Password</a></p>
            <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    console.log("Mensaje enviado: %s", info.messageId);
}

export default emailOlvidePassword;
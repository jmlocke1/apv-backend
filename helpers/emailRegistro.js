import nodemailer from "nodemailer";
import config from "../config/config.js";
const { frontDomain, mailHost, mailPort, mailUser, mailPassword } = config;

const emailRegistro = async (datos) => {
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
        subject: 'Comprueba tu cuente en APV',
        text: 'Comrpueba tu cuenta en APV',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV</p>
            <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace: <a href="${frontDomain}/confirmar/${token}">Comprobar Cuenta</a></p>
            <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    console.log("Mensaje enviado: %s", info.messageId);
}

export default emailRegistro;
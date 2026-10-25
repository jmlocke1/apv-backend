import nodemailer from "nodemailer";
import config from "../config/config.js";
const { mailHost, mailPort, mailUser, mailPassword } = config;

const emailRegistro = () => {
    var transport = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        auth: {
            user: mailUser,
            pass: mailPassword
        }
    });
}

export default emailRegistro;
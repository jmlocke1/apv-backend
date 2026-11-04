// Crear en el servidor local o en producción un fichero llamado config.js que contenga
// estas mismas variables, pero con los valores correctos
const config = {
    frontDomain: 'http://localhost:5173',
    databaseHost: 'localhost',
    portDB: '27017',
    databaseName: 'apv',
    portApp: '4000',
    JWT_Secret: 'palabrasupersecreta',
    JWT_MAX_TIME_EXPIRED: 300, // 300 segundos, o cinco minutos, desde que expiró
    JWT_EXPIRES_IN: '30d',
    allowedDomains: ["http://localhost:5173"],
    mailHost: "sandbox.smtp.mailtrap.io",
    mailPort: 2525,
    mailUser: "mailUser",
    mailPassword: "mailPassword"
}

//export default config;
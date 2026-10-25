// Crear en el servidor local o en producción un fichero llamado config.js que contenga
// estas mismas variables, pero con los valores correctos
const config = {
    databaseHost: 'localhost',
    portDB: '27017',
    databaseName: 'apv',
    portApp: '4000',
    JWT_Secret: 'palabrasupersecreta',
    allowedDomains: ["http://localhost:5173"],
    mailHost: "sandbox.smtp.mailtrap.io",
    mailPort: 2525,
    mailUser: "mailUser",
    mailPassword: "mailPassword"
}

//export default config;
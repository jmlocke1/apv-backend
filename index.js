import express from "express";
import cors from "cors";
import conectarDB from "./config/db.js";
import config from "./config/config.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from "./routes/pacienteRoutes.js";
const { portApp } = config;

const app = express();
app.use(express.json());

conectarDB();


const corsOptions = {
    origin: function(origin, callback) {
        if(config.allowedDomains.indexOf(origin) !== -1 ) {
            // El origen del Request está permitido
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    }
}

app.use(cors(corsOptions));

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

app.listen(portApp, () => {
    console.log(`Servidor funcionando en el puerto: ${portApp}`);
});
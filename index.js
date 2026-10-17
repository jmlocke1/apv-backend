import express from "express";
import conectarDB from "./config/db.js";
import config from "./config/config.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from "./routes/pacienteRoutes.js";
const { portApp } = config;

const app = express();
app.use(express.json());

conectarDB();

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

app.listen(portApp, () => {
    console.log(`Servidor funcionando en el puerto: ${portApp}`);
});
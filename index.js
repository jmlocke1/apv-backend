import express from "express";
import conectarDB from "./config/db.js";
import config from "./config/config.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
const { portApp } = config;

const app = express();

conectarDB();

app.use("/api/veterinarios", veterinarioRoutes);

app.listen(portApp, () => {
    console.log(`Servidor funcionando en el puerto: ${portApp}`);
});
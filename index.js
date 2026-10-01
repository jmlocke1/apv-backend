import express from "express";
import conectarDB from "./config/db.js";
import config from "./config/config.js";
const { portApp } = config;

const app = express();

conectarDB();

app.use("/", (req,res) => {
    res.send("Hola Mundo");
});

app.listen(portApp, () => {
    console.log(`Servidor funcionando en el puerto: ${portApp}`);
});
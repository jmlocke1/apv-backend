import mongoose from "mongoose";
import config from "./config.js";
const { databaseHost, portDB, databaseName } = config;


const conectarDB = async () => {
    try {
        const db = await mongoose.connect(`mongodb://${databaseHost}:${portDB}/${databaseName}`);

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default conectarDB;
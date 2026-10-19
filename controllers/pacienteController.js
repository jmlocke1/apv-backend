import mongoose from "mongoose";
import Paciente from "../models/Paciente.js";

const columns = ["nombre", "propietario", "email", "fecha_alta", "sintomas", "veterinario"];

const agregarPaciente = async (req, res) => {
    if(!req.veterinario) return;
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id
    try {
        const pacienteGuardado = await paciente.save();
        res.json(pacienteGuardado);
    } catch (error) {
        console.log(error);
    }
}

const obtenerPacientes = async (req, res) => {
    if(!req.veterinario) return;
    const pacientes = await Paciente.find()
        .where("veterinario")
        .equals(req.veterinario);

    res.json(pacientes);
}

const obtenerPaciente = async (req, res) => {
    if(!req.veterinario) return;
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no válido");
        return res.status(403).json({msg: error.message});
    }
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        return res.status(404).json({msg: 'No encontrado'});
    }
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(404).json({msg: "Acción no permitida"});
    }
    
    res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
    if(!req.veterinario) return;
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no válido");
        return res.status(403).json({msg: error.message});
    }
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        return res.status(404).json({msg: 'No encontrado'});
    }
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(404).json({msg: "Acción no permitida"});
    }
    
    // Actualizar Paciente
    columns.forEach(key=>{
        paciente[key] = req.body[key] ?? paciente[key];
    })
    try {
        const pacienteActualizado = await paciente.save();
        console.log(pacienteActualizado.updatedAt.toLocaleString("es-ES", {
            timezone: "Europe/Madrid"
        }));
        res.json(pacienteActualizado);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
};

const eliminarPaciente = async (req, res) => {
    if(!req.veterinario) return;
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no válido");
        return res.status(403).json({msg: error.message});
    }

    const paciente = await Paciente.findById(id);

    if(!paciente) {
        return res.status(404).json({msg: 'No encontrado'});
    }
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(404).json({msg: "Acción no permitida"});
    }

    try {
        await paciente.deleteOne();
        res.json({msg: "Paciente Eliminado"});
    } catch (error) {
        return res.status(404).json({msg: error.message});
    }
};

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}
import Paciente from "../models/Paciente.js";


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


export {
    agregarPaciente,
    obtenerPacientes
}
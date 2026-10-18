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

const obtenerPaciente = async (req, res) => {
    if(!req.veterinario) return;
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(404).json({msg: "Acción no permitida"});
    }
    if(paciente) {
        res.json(paciente);
    }
};

const actualizarPaciente = async (req, res) => {
    if(!req.veterinario) return;
};

const eliminarPaciente = async (req, res) => {
    if(!req.veterinario) return;
};

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}
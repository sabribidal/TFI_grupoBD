import Medicos from '../database/medicos.js';

export default class MedicosService {

    constructor() {
        this.medicos = new Medicos();
    }

    buscarTodas = async () => {
        return await this.medicos.buscarTodas();
    }

    buscarPorId = async (id) => {
        return await this.medicos.buscarPorId(id);
    }

    buscarPorEspecialidad = async (id_especialidad) => {
        return await this.medicos.buscarPorEspecialidad(id_especialidad);
    }

    crear = async (datos) => {
        return await this.medicos.crear(datos);
    }

    actualizar = async (id, datos) => {

        const existente = await this.medicos.buscarPorId(id);

        if (!existente) {
            const error = new Error(`No se encontró el médico con ID ${id}.`);
            error.status = 404;
            throw error;
        }

        return await this.medicos.actualizar(id, datos);
    }

    eliminar = async (id) => {

        const existente = await this.medicos.buscarPorId(id);

        if (!existente) {
            const error = new Error(`No se encontró el médico con ID ${id}.`);
            error.status = 404;
            throw error;
        }

        return await this.medicos.eliminar(id);
    }
}
import Pacientes from '../database/pacientes.js';

export default class PacientesService {

    constructor() {
        this.pacientes = new Pacientes();
    }

    buscarTodas = async () => {
        return await this.pacientes.buscarTodas();
    }

    buscarPorId = async (id) => {
        return await this.pacientes.buscarPorId(id);
    }

    crear = async (datos) => {
        return await this.pacientes.crear(datos);
    }

    actualizar = async (id, datos) => {

        const existente = await this.pacientes.buscarPorId(id);

        if (!existente) {
            const error = new Error(
                `No se encontró el paciente con ID ${id}`
            );

            error.status = 404;

            throw error;
        }

        return await this.pacientes.actualizar(id, datos);
    }

    eliminar = async (id) => {

        const existente = await this.pacientes.buscarPorId(id);

        if (!existente) {

            const error = new Error(
                `No se encontró el paciente con ID ${id}`
            );

            error.status = 404;

            throw error;
        }

        return await this.pacientes.eliminar(id);
    }

}
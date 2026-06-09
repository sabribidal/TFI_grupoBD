import Especialidades from '../database/especialidades.js';


export default class EspecialidadesService {

    constructor() {
        this.especialidades = new Especialidades();
    }

    buscarTodas = async () => {
        return await this.especialidades.buscarTodas();
    }

    buscarPorId = async (id) => {
        return await this.especialidades.buscarPorId(id);
    }

    crear = async (datos) => {
        return await this.especialidades.crear(datos);
    }


    actualizar = async (id, datos) => {
        const existente = await this.especialidades.buscarPorId(id);
        if (!existente) {
            const error = new Error(`No se encontró la especialidad con el ID ${id}.`);
            error.status = 404;
            throw error;
        }
        return await this.especialidades.actualizar(id, datos);
    }


    eliminar = async (id) => {
        const existente = await this.especialidades.buscarPorId(id);
        if (!existente) {
            const error = new Error(`No se encontró la especialidad con el ID ${id}.`);
            error.status = 404;
            throw error;
        }
        return await this.especialidades.eliminar(id);
    }
}
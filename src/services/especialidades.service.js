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

    crear = async (especialidad) => {
        return await this.especialidades.crear(especialidad);
    }

    actualizar = async (id, especialidad) => {
        return await this.especialidades.actualizar(id, especialidad);
    }

    eliminar = async (id) => {
        return await this.especialidades.eliminar(id);
    }

}


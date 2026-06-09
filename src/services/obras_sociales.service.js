import ObrasSociales from '../database/obras_sociales.js';


export default class ObrasSocialesService {

    constructor() {
        this.obrasSociales = new ObrasSociales();
    }

    buscarTodas = async () => {
        return await this.obrasSociales.buscarTodas();
    }

    buscarPorId = async (id) => {
        return await this.obrasSociales.buscarPorId(id);
    }

    crear = async (datos) => {
        return await this.obrasSociales.crear(datos);
    }



    actualizar = async (id, datos) => {
        const existente = await this.obrasSociales.buscarPorId(id);
        if (!existente) {
            const error = new Error(`No se encontró la obra social con el ID ${id}.`);
            error.status = 404;
            throw error;
        }
        return await this.obrasSociales.actualizar(id, datos);
    }



    eliminar = async (id) => {
        const existente = await this.obrasSociales.buscarPorId(id);
        if (!existente) {
            const error = new Error(`No se encontró la obra social con el ID ${id}.`);
            error.status = 404;
            throw error;
        }
        return await this.obrasSociales.eliminar(id);
    }
}
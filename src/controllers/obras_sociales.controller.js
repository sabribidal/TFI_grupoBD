
import ObrasSocialesService from '../services/obras_sociales.service.js';


export default class ObrasSocialesController {

    constructor() {
        this.service = new ObrasSocialesService();
    }


    // BUSCAR TODAS — GET
    buscarTodas = async (req, res) => {
        try {
            const obrasSociales = await this.service.buscarTodas();
            return res.status(200).json({
                estado: true,
                mensaje: 'Obras sociales obtenidas correctamente.',
                datos: obrasSociales,
            });
        } catch (error) {
            console.error('[ObrasSocialesController.buscarTodas]', error.message);
            return res.status(500).json({
                estado: false,
                mensaje: 'Error al obtener las obras sociales.',
                datos: null,
            });
        }
    }


    // BUSCAR POR ID — GET
    buscarPorId = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const obraSocial = await this.service.buscarPorId(id);

            if (!obraSocial) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró la obra social con el ID ${id}.`,
                    datos: null,
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: 'Obra social obtenida correctamente.',
                datos: obraSocial,
            });
        } catch (error) {
            console.error('[ObrasSocialesController.buscarPorId]', error.message);
            return res.status(500).json({
                estado: false,
                mensaje: 'Error al obtener la obra social.',
                datos: null,
            });
        }
    }


    // AÑADIR — POST
    crear = async (req, res) => {
        try {
            const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;
            const nueva = await this.service.crear({ nombre, descripcion, porcentaje_descuento, es_particular });
            return res.status(201).json({
                estado: true,
                mensaje: 'Obra social creada correctamente.',
                datos: nueva,
            });
        } catch (error) {
            console.error('[ObrasSocialesController.crear]', error.message);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    estado: false,
                    mensaje: 'Ya existe una obra social con ese nombre.',
                    datos: null,
                });
            }
            return res.status(500).json({
                estado: false,
                mensaje: 'Error al crear la obra social.',
                datos: null,
            });
        }
    }


    // EDITAR — PUT
    // El servicio verifica si existe, si no error
    actualizar = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;
            const actualizada = await this.service.actualizar(id, { nombre, descripcion, porcentaje_descuento, es_particular });
            return res.status(200).json({
                estado: true,
                mensaje: 'Obra social actualizada correctamente.',
                datos: actualizada,
            });
        } catch (error) {
            console.error('[ObrasSocialesController.actualizar]', error.message);
            if (error.status === 404) {
                return res.status(404).json({
                    estado: false,
                    mensaje: error.message,
                    datos: null,
                });
            }
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    estado: false,
                    mensaje: 'Ya existe una obra social con ese nombre.',
                    datos: null,
                });
            }
            return res.status(500).json({
                estado: false,
                mensaje: 'Error al actualizar la obra social.',
                datos: null,
            });
        }
    }


    // BORRAR — DELETE
    eliminar = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await this.service.eliminar(id);
            return res.status(200).json({
                estado: true,
                mensaje: `Obra social con ID ${id} eliminada correctamente.`,
                datos: null,
            });
        } catch (error) {
            console.error('[ObrasSocialesController.eliminar]', error.message);
            if (error.status === 404) {
                return res.status(404).json({
                    estado: false,
                    mensaje: error.message,
                    datos: null,
                });
            }
            return res.status(500).json({
                estado: false,
                mensaje: 'Error al eliminar la obra social.',
                datos: null,
            });
        }
    }
}
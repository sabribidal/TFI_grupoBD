import MedicosService from '../services/medicos.service.js';

export default class MedicosController {

    constructor() {
        this.service = new MedicosService();
    }

    buscarTodas = async (req, res) => {
        try {
            const medicos = await this.service.buscarTodas();

            return res.status(200).json({
                estado: true,
                mensaje: 'Médicos obtenidos correctamente.',
                datos: medicos,
            });

        } catch (error) {

            console.error('[MedicosController.buscarTodas]', error.message);

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al obtener los médicos.',
                datos: null,
            });
        }
    }

    buscarPorId = async (req, res) => {

        try {

            const id = parseInt(req.params.id);

            const medico = await this.service.buscarPorId(id);

            if (!medico) {

                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró el médico con ID ${id}.`,
                    datos: null,
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: 'Médico obtenido correctamente.',
                datos: medico,
            });

        } catch (error) {

            console.error('[MedicosController.buscarPorId]', error.message);

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al obtener el médico.',
                datos: null,
            });
        }
    }

    buscarPorEspecialidad = async (req, res) => {

        try {

            const id_especialidad = parseInt(req.params.id_especialidad);

            const medicos = await this.service.buscarPorEspecialidad(id_especialidad);

            return res.status(200).json({
                estado: true,
                mensaje: 'Médicos de la especialidad obtenidos correctamente.',
                datos: medicos,
            });

        } catch (error) {

            console.error('[MedicosController.buscarPorEspecialidad]', error.message);

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al obtener los médicos de la especialidad.',
                datos: null,
            });
        }
    }

    crear = async (req, res) => {

        try {

            const {
                id_usuario,
                id_especialidad,
                matricula,
                descripcion,
                valor_consulta
            } = req.body;

            const nuevo = await this.service.crear({
                id_usuario,
                id_especialidad,
                matricula,
                descripcion,
                valor_consulta
            });

            return res.status(201).json({
                estado: true,
                mensaje: 'Médico creado correctamente.',
                datos: nuevo,
            });

        } catch (error) {

            console.error('[MedicosController.crear]', error.message);

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al crear el médico.',
                datos: null,
            });
        }
    }

    actualizar = async (req, res) => {

        try {

            const id = parseInt(req.params.id);

            const {
                id_usuario,
                id_especialidad,
                matricula,
                descripcion,
                valor_consulta
            } = req.body;

            const actualizado = await this.service.actualizar(id, {
                id_usuario,
                id_especialidad,
                matricula,
                descripcion,
                valor_consulta
            });

            return res.status(200).json({
                estado: true,
                mensaje: 'Médico actualizado correctamente.',
                datos: actualizado,
            });

        } catch (error) {

            if (error.status === 404) {

                return res.status(404).json({
                    estado: false,
                    mensaje: error.message,
                    datos: null,
                });
            }

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al actualizar el médico.',
                datos: null,
            });
        }
    }

    eliminar = async (req, res) => {

        try {

            const id = parseInt(req.params.id);

            await this.service.eliminar(id);

            return res.status(200).json({
                estado: true,
                mensaje: 'Médico eliminado correctamente.',
                datos: null,
            });

        } catch (error) {

            if (error.status === 404) {

                return res.status(404).json({
                    estado: false,
                    mensaje: error.message,
                    datos: null,
                });
            }

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al eliminar el médico.',
                datos: null,
            });
        }
    }
}
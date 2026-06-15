import PacientesService from '../services/pacientes.service.js';

export default class PacientesController {

    constructor() {
        this.service = new PacientesService();
    }

    buscarTodas = async (req, res) => {

        try {

            const pacientes = await this.service.buscarTodas();

            return res.status(200).json({
                estado: true,
                mensaje: 'Pacientes obtenidos correctamente.',
                datos: pacientes
            });

        } catch (error) {

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al obtener pacientes.',
                datos: null
            });
        }
    }

    buscarPorId = async (req, res) => {

        try {

            const id = parseInt(req.params.id);

            const paciente = await this.service.buscarPorId(id);

            if (!paciente) {

                return res.status(404).json({
                    estado: false,
                    mensaje: 'Paciente no encontrado.',
                    datos: null
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: 'Paciente obtenido correctamente.',
                datos: paciente
            });

        } catch (error) {

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al obtener paciente.',
                datos: null
            });
        }
    }

    crear = async (req, res) => {

        try {

            const {
                id_usuario,
                id_obra_social
            } = req.body;

            const nuevo = await this.service.crear({
                id_usuario,
                id_obra_social
            });

            return res.status(201).json({
                estado: true,
                mensaje: 'Paciente creado correctamente.',
                datos: nuevo
            });

        } catch (error) {

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al crear paciente.',
                datos: null
            });
        }
    }

    actualizar = async (req, res) => {

        try {

            const id = parseInt(req.params.id);

            const {
                id_usuario,
                id_obra_social
            } = req.body;

            const actualizado =
                await this.service.actualizar(id, {
                    id_usuario,
                    id_obra_social
                });

            return res.status(200).json({
                estado: true,
                mensaje: 'Paciente actualizado correctamente.',
                datos: actualizado
            });

        } catch (error) {

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al actualizar paciente.',
                datos: null
            });
        }
    }

    eliminar = async (req, res) => {

        try {

            const id = parseInt(req.params.id);

            await this.service.eliminar(id);

            return res.status(200).json({
                estado: true,
                mensaje: 'Paciente eliminado correctamente.',
                datos: null
            });

        } catch (error) {

            return res.status(500).json({
                estado: false,
                mensaje: 'Error al eliminar paciente.',
                datos: null
            });
        }
    }

}
import { check, param } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
//const EspecialidadesService = require('../services/especialidades.service');

import EspecialidadesService from '../services/especialidades.service.js';

export default class EspecialidadesController {
    constructor() {
        this.especialidadesService = new EspecialidadesService();
    }

    buscarTodas = async (req, res) => {
        try {
            const especialidades = await this.especialidadesService.buscarTodas();

            if (!especialidades || especialidades.length === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'No se encontraron especialidades',
                    datos: null,
                });
            }
            res.status(200).json(
                {
                    estado: true,
                    mensaje: 'Especialidades obtenidas correctamente',
                    datos: especialidades
                }
            );
            
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                estado: false,
                error: 'Error interno del servidor al obtener las especialidades',
            });
        }
    }

    buscarPorId = async (req, res) => {
        try {
           
            const { id } = req.params;

            if (isNaN(id)) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El ID proporcionado no es válido.',
                    datos: null,
                });
            }

            const especialidad = await this.especialidadesService.buscarPorId(id);
            
            if (!especialidad) {
                    return res.status(404).json({
                        estado: false,
                        mensaje: `No se encontró la especialidad con la ID ${id}`,
                        datos: null,
                    });
                }

            res.status(200).json({
                estado: true,
                mensaje: 'Especialidad encontrada',
                datos: especialidad
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                estado: false,
                error: 'Error interno del servidor al obtener la especialidad',
            });
        }
    }

    nuevaEspecialidad = async (req, res) => {
        
        try {
            const { nombre } = req.body;

            if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El nombre de la especialidad es requerido y debe ser una cadena no vacía.',
                    datos: null,
                });
            }

            const nuevaEspecialidad = await this.especialidadesService.crear({ nombre });

            res.status(201).json({
                estado: true,
                mensaje: 'Especialidad creada correctamente',
                datos: nuevaEspecialidad
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                estado: false,
                error: 'Error interno del servidor al crear la especialidad',
            });
        }
    }

    actualizarEspecialidad = async (req, res) => {
        
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El ID proporcionado no es válido.',
                    datos: null,
                });
            }

            const { nombre } = req.body;

            console.log("Valores recibidos -> ID:", id, "Nombre:", nombre);

            if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El nombre de la especialidad es requerido y debe ser una cadena no vacía.',
                    datos: null,
                });
            }

            const especialidadExistente = await this.especialidadesService.buscarPorId(id);

            if (!especialidadExistente) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró la especialidad con la ID ${id}`,
                    datos: null,
                });
            }
            
            const especialidadActualizada = await this.especialidadesService.actualizar(id, { nombre });

            res.status(200).json({
                estado: true,
                mensaje: 'Especialidad actualizada correctamente',
                datos: especialidadActualizada
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                estado: false,
                error: 'Error interno del servidor al actualizar la especialidad',
            });
        }
    }

    eliminarEspecialidad = async (req, res) => {
        
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El ID proporcionado no es válido.',
                    datos: null,
                });
            }
            
            const especialidadExistente = await this.especialidadesService.buscarPorId(id);

            if (!especialidadExistente) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró la especialidad con la ID ${id}`,
                    datos: null,
                });
            }

            await this.especialidadesService.eliminar(id);

            res.status(200).json({
                estado: true,
                mensaje: 'Especialidad eliminada correctamente',
                datos: null
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                estado: false,
                error: 'Error interno del servidor al eliminar la especialidad',
        });
        }
    }
}

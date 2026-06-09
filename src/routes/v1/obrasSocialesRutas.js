import express from 'express';
import ObrasSocialesController from '../../controllers/obras_sociales.controller.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import {
    validarCrearObraSocial,
    validarActualizarObraSocial,
    validarIdObraSocial,
} from '../../validations/obras_sociales.validations.js';


const router = express.Router();
const controller = new ObrasSocialesController();

// falta agregar el middleware de autenticación.


router.get('/', controller.buscarTodas);
router.get('/:id', validarIdObraSocial, validarCampos, controller.buscarPorId);
router.post('/', validarCrearObraSocial, validarCampos, controller.crear);
router.put('/:id', validarActualizarObraSocial, validarCampos, controller.actualizar);
router.delete('/:id', validarIdObraSocial, validarCampos, controller.eliminar);


export { router };
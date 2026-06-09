import express from 'express';
import EspecialidadesController from '../../controllers/especialidades.controller.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import {
    validarCrearEspecialidad,
    validarActualizarEspecialidad,
    validarIdEspecialidad,
} from '../../validations/especialidades.validations.js';


const router = express.Router();
const controller = new EspecialidadesController();

// falta agregar el middleware de autenticación antes de las rutas que lo requieran.


router.get('/', controller.buscarTodas);
router.get('/:id', validarIdEspecialidad, validarCampos, controller.buscarPorId);
router.post('/', validarCrearEspecialidad, validarCampos, controller.crear);
router.put('/:id', validarActualizarEspecialidad, validarCampos, controller.actualizar);
router.delete('/:id', validarIdEspecialidad, validarCampos, controller.eliminar);


export { router };
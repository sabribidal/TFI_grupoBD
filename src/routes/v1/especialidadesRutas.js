import express from 'express';
import EspecialidadesController from '../../controllers/especialidades.controller.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import {
    validarCrearEspecialidad,
    validarActualizarEspecialidad,
    validarIdEspecialidad,
} from '../../validations/especialidades.validations.js';
import passport from '../../middlewares/passport.js';
import { autorizar } from '../../middlewares/autorizar.js';


const router = express.Router();
const controller = new EspecialidadesController();


router.get('/', passport.authenticate('jwt', { session: false }), controller.buscarTodas);
router.get('/:id', passport.authenticate('jwt', { session: false }), validarIdEspecialidad, validarCampos, controller.buscarPorId);
router.post('/', passport.authenticate('jwt', { session: false }), autorizar(3), validarCrearEspecialidad, validarCampos, controller.crear);
router.put('/:id', passport.authenticate('jwt', { session: false }), autorizar(3), validarActualizarEspecialidad, validarCampos, controller.actualizar);
router.delete('/:id', passport.authenticate('jwt', { session: false }), autorizar(3), validarIdEspecialidad, validarCampos, controller.eliminar);


export { router };
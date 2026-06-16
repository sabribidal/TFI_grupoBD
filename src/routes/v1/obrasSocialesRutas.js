import express from 'express';
import ObrasSocialesController from '../../controllers/obras_sociales.controller.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import {
    validarCrearObraSocial,
    validarActualizarObraSocial,
    validarIdObraSocial,
} from '../../validations/obras_sociales.validations.js';
import passport from '../../middlewares/passport.js';
import { autorizar } from '../../middlewares/autorizar.js';


const router = express.Router();
const controller = new ObrasSocialesController();


router.get('/', passport.authenticate('jwt', { session: false }), autorizar(3), controller.buscarTodas);
router.get('/:id', passport.authenticate('jwt', { session: false }), autorizar(3), validarIdObraSocial, validarCampos, controller.buscarPorId);
router.post('/', passport.authenticate('jwt', { session: false }), autorizar(3), validarCrearObraSocial, validarCampos, controller.crear);
router.put('/:id', passport.authenticate('jwt', { session: false }), autorizar(3), validarActualizarObraSocial, validarCampos, controller.actualizar);
router.delete('/:id', passport.authenticate('jwt', { session: false }), autorizar(3), validarIdObraSocial, validarCampos, controller.eliminar);


export { router };
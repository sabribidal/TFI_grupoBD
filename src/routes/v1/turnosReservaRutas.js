import express from 'express';
import { validarTurnoReserva } from '../../validations/turnosReservado.validation.js';
import {validarCampos} from '../../middlewares/validarCampos.js';
import passport from '../../middlewares/passport.js';

import TurnosReservadoController from '../../controllers/TurnosReservado.controller.js';
import { autorizar } from '../../middlewares/autorizar.js';

const router = express.Router();
const turnosReservadoController = new TurnosReservadoController();
const auth = passport.authenticate('jwt', { session: false });

router.get('/', auth, autorizar('1, 2'), turnosReservadoController.buscarTodos);
router.get('/:id', auth, autorizar('1, 2'), validarTurnoReserva, validarCampos, turnosReservadoController.crear);

export { router }
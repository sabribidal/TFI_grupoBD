import express from 'express';
import { validarTurnoReserva, validarIdTurnoReserva } from '../../validations/turnosReservado.validation.js';
import {validarCampos} from '../../middlewares/validarCampos.js';
import passport from '../../middlewares/passport.js';

import TurnosReservadoController from '../../controllers/TurnosReservado.controller.js';
import { autorizar } from '../../middlewares/autorizar.js';

const router = express.Router();
const turnosReservadoController = new TurnosReservadoController();
const auth = passport.authenticate('jwt', { session: false });

router.get('/', auth, autorizar(1, 2), turnosReservadoController.buscarTodos);

router.post('/', auth, autorizar(2, 3), validarTurnoReserva, validarCampos, turnosReservadoController.crear);

router.put('/:id/atender', auth, autorizar(1), validarIdTurnoReserva, validarCampos, turnosReservadoController.atender);

export { router }
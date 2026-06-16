import express from 'express';
import { validarTurnoReserva } from '../../validations/turnosReservado.validation.js';
import {validarCampos} from '../../middlewares/validarCampos.js';

import TurnosReservadoController from '../../controllers/TurnosReservado.controller.js';
import { autorizar } from '../../middlewares/autorizar.js';

const router = express.Router();
const turnosReservadoController = new TurnosReservadoController();

router.get('/', autorizar([1,2]) ,turnosReservadoController.buscarTodos);
router.post('/', validarTurnoReserva, validarCampos, turnosReservadoController.crear);

export {router}

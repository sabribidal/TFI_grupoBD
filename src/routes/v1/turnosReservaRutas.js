import express from 'express';
import { validarTurnoReserva } from '../../validations/turnosReservado.validation.js';
import {validarCampos} from '../../middlewares/validarCampos.js';

import TurnosReservadoController from '../../controllers/TurnosReservado.controller.js';

const router = express.Router();
const turnosReservadoController = new TurnosReservadoController();

router.get('/', turnosReservadoController.buscarTodos);router.get('/por-especialidad', turnosReservadoController.porEspecialidad);
router.post('/', validarTurnoReserva, validarCampos, turnosReservadoController.crear);

export {router}

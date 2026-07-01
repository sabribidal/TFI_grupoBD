import express from 'express';
import passport from '../../middlewares/passport.js';
import { autorizar } from '../../middlewares/autorizar.js';
import PacientesController from '../../controllers/pacientes.controller.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import {
    validarCrearPaciente,
    validarActualizarPaciente,
    validarIdPaciente,
} from '../../validations/pacientes.validations.js';

const router = express.Router();
const controller = new PacientesController();

const auth = passport.authenticate('jwt', { session: false });

router.get('/', auth, autorizar(1, 2), controller.buscarTodas);

router.get('/:id',
    auth,
    autorizar(1, 2),
    validarIdPaciente,
    validarCampos,
    controller.buscarPorId
);

router.post('/',
    auth,
    autorizar(3),
    validarCrearPaciente,
    validarCampos,
    controller.crear
);

router.put('/:id',
    auth,
    autorizar(3),
    validarActualizarPaciente,
    validarCampos,
    controller.actualizar
);

router.delete('/:id',
    auth,
    autorizar(3),
    validarIdPaciente,
    validarCampos,
    controller.eliminar
);

export default router;
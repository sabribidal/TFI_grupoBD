import express from 'express';
import PacientesController from '../../controllers/pacientes.controller.js';

const router = express.Router();

const controller = new PacientesController();

router.get('/', controller.buscarTodas);

router.get('/:id', controller.buscarPorId);

router.post('/', controller.crear);

router.put('/:id', controller.actualizar);

router.delete('/:id', controller.eliminar);

export default router;
import { Router } from 'express';
import MedicosController from '../../controllers/medicos.controller.js';

const router = Router();
const controller = new MedicosController();

router.get('/', controller.buscarTodas);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.crear);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

export { router };
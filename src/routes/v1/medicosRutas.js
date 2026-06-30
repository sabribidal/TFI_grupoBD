import { Router } from 'express';
import MedicosController from '../../controllers/medicos.controller.js';
import passport from '../../middlewares/passport.js';
import { autorizar } from '../../middlewares/autorizar.js';

const router = Router();
const controller = new MedicosController();
const auth = passport.authenticate('jwt', { session: false });


router.get('/', auth, autorizar('2, 3'), controller.buscarTodas);
router.get('/especialidad/:id_especialidad', auth, autorizar('2, 3'), controller.buscarPorEspecialidad);
router.get('/:id', auth, autorizar('2, 3'), controller.buscarPorId);


router.post('/', auth, autorizar('3'), controller.crear);
router.put('/:id', auth, autorizar('3'), controller.actualizar);
router.delete('/:id', auth, autorizar('3'), controller.eliminar);


export { router };
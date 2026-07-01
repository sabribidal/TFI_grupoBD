import { Router } from 'express';
import MedicosController from '../../controllers/medicos.controller.js';
import passport from '../../middlewares/passport.js';
import { autorizar } from '../../middlewares/autorizar.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { validarCrearMedico, validarActualizarMedico, validarIdMedico } from '../../validations/medicos.validations.js';

const router = Router();
const controller = new MedicosController();
const auth = passport.authenticate('jwt', { session: false });


router.get('/', auth, autorizar('2, 3'), controller.buscarTodas);
router.get('/especialidad/:id_especialidad', auth, autorizar('2, 3'), controller.buscarPorEspecialidad);
router.get('/:id', auth, autorizar('2, 3'), validarIdMedico, validarCampos, controller.buscarPorId);


router.post('/', auth, autorizar('3'), validarCrearMedico, validarCampos, controller.crear);
router.put('/:id', auth, autorizar('3'), validarActualizarMedico, validarCampos, controller.actualizar);
router.delete('/:id', auth, autorizar('3'), validarIdMedico, validarCampos, controller.eliminar);


export { router };
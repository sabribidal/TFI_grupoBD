import express from "express";
import EspecialidadesController from "../../controllers/especialidades.controller.js";

const router = express.Router();
const controller = new EspecialidadesController();

router.get('/', controller.buscarTodas);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.nuevaEspecialidad);
router.put('/:id', controller.actualizarEspecialidad);
router.delete('/:id', controller.eliminarEspecialidad);

export { router };
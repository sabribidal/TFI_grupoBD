import express from 'express';
import PDFController from '../../controllers/pdfController.js';
import { validarReporte } from '../../middlewares/validarReporte.js';

const router = express.Router();
const controller = new PDFController();

router.get('/medicos', controller.buscarMedicos);
router.get('/especialidades', controller.buscarEspecialidades);
router.get('/reporte/:medicoId/:fecha', validarReporte, controller.generarReportePDF);

export { router };

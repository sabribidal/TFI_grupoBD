import express from 'express';
import PDFController from '../../controllers/pdfController.js';
import { validarReporte } from '../../middlewares/validarReporte.js';
import passport from '../../middlewares/passport.js';
import { autorizar } from '../../middlewares/autorizar.js';

const router = express.Router();
const controller = new PDFController();

const autorizarReporte = (req, res, next) => {
    const { rol, id } = req.user;
    const medicoId = parseInt(req.params.medicoId);

    if (rol === 3) return next();                        
    if (rol === 1 && id === medicoId) return next();     

    return res.status(403).json({ mensaje: "Acceso denegado" });
};

router.get('/medicos',
    passport.authenticate('jwt', { session: false }),
    autorizar(1, 3),
    controller.buscarMedicos
);
router.get('/especialidades',
    passport.authenticate('jwt', { session: false }),
    autorizar(1, 3),
    controller.buscarEspecialidades
);
router.get('/reporte-mensual/:anio/:mes',
    passport.authenticate('jwt', { session: false }),
    autorizar(3),  
    controller.generarReporteMensual    
);
router.get('/reporte/:medicoId/:fecha', 
    passport.authenticate('jwt', { session: false }),
    autorizarReporte,   
    validarReporte,
    controller.generarReportePDF
);

export { router };
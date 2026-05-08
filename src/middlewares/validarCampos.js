import { validationResult } from "express-validator";
import { check, param } from 'express-validator';

export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {    
        return res.status(400).json({
            estado: 'error',
            mensaje: 'Error de validación', 
        });
    }   
    next();
};

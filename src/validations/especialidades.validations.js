import { body, param } from 'express-validator';


export const validarCrearEspecialidad = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio, no puede quedar vacio.')
        .isString().withMessage('El nombre debe ser texto.')
        .isLength({ min: 1, max: 120 }).withMessage('El nombre debe tener entre 1 y 120 caracteres.')
        .trim(),
];


export const validarActualizarEspecialidad = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.'),
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio, no puede ir vacio.')
        .isString().withMessage('El nombre debe ser texto.')
        .isLength({ min: 1, max: 120 }).withMessage('El nombre debe tener entre 1 y 120 caracteres.')
        .trim(),
];


export const validarIdEspecialidad = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.'),
];
import { body, param } from 'express-validator';


export const validarCrearPaciente = [
    body('id_usuario')
        .notEmpty().withMessage('El id_usuario es obligatorio.')
        .isInt({ min: 1 }).withMessage('El id_usuario debe ser un número entero positivo.'),

    body('id_obra_social')
        .notEmpty().withMessage('El id_obra_social es obligatorio.')
        .isInt({ min: 1 }).withMessage('El id_obra_social debe ser un número entero positivo.'),
];


// (todos los campos son opcionales)
export const validarActualizarPaciente = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.'),

    body('id_usuario')
        .optional()
        .isInt({ min: 1 }).withMessage('El id_usuario debe ser un número entero positivo.'),

    body('id_obra_social')
        .optional()
        .isInt({ min: 1 }).withMessage('El id_obra_social debe ser un número entero positivo.'),
];


export const validarIdPaciente = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.'),
];
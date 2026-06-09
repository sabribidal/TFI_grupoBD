import { body, param } from 'express-validator';


export const validarCrearObraSocial = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio, no puede quedar vacio.')
        .isString().withMessage('El nombre debe ser texto.')
        .isLength({ min: 1, max: 120 }).withMessage('El nombre debe tener entre 1 y 120 caracteres.')
        .trim(),

    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria, no puede quedar vacia.')
        .isString().withMessage('La descripción debe ser texto.')
        .isLength({ max: 255 }).withMessage('La descripción no puede superar los 255 caracteres.')
        .trim(),

    body('porcentaje_descuento')
        .notEmpty().withMessage('El porcentaje de descuento es obligatorio, va del 0 al 100.')
        .isFloat({ min: 0, max: 100 }).withMessage('El porcentaje debe ser un número entre 0 y 100.'),

    body('es_particular')
        .optional()
        .isBoolean().withMessage('El campo es particular debe ser true (si sí) o false (si no).')
        .toBoolean(),
];


// (todos los campos son opcionales)
export const validarActualizarObraSocial = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.'),

    body('nombre')
        .optional()
        .isString().withMessage('El nombre debe ser texto.')
        .isLength({ min: 1, max: 120 }).withMessage('El nombre debe tener entre 1 y 120 caracteres.')
        .trim(),

    body('descripcion')
        .optional()
        .isString().withMessage('La descripción debe ser texto.')
        .isLength({ max: 255 }).withMessage('La descripción no puede superar los 255 caracteres.')
        .trim(),

    body('porcentaje_descuento')
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage('El porcentaje debe ser un número entre 0 y 100.'),

    body('es_particular')
        .optional()
        .isBoolean().withMessage('El campo es particular debe ser true (si sí) o false (si no).')
        .toBoolean(),
];


export const validarIdObraSocial = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.'),
];
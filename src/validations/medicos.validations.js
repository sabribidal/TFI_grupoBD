import { body, param } from 'express-validator';


export const validarCrearMedico = [
    body('id_usuario')
        .notEmpty().withMessage('El id_usuario es obligatorio.')
        .isInt({ min: 1 }).withMessage('El id_usuario debe ser un número entero positivo.'),

    body('id_especialidad')
        .notEmpty().withMessage('El id_especialidad es obligatorio.')
        .isInt({ min: 1 }).withMessage('El id_especialidad debe ser un número entero positivo.'),

    body('matricula')
        .notEmpty().withMessage('La matrícula es obligatoria, no puede quedar vacía.')
        .isString().withMessage('La matrícula debe ser texto.')
        .isLength({ min: 1, max: 50 }).withMessage('La matrícula debe tener entre 1 y 50 caracteres.')
        .trim(),

    body('descripcion')
        .optional()
        .isString().withMessage('La descripción debe ser texto.')
        .isLength({ max: 255 }).withMessage('La descripción no puede superar los 255 caracteres.')
        .trim(),

    body('valor_consulta')
        .notEmpty().withMessage('El valor_consulta es obligatorio.')
        .isFloat({ min: 0 }).withMessage('El valor_consulta debe ser un número positivo.'),

    body('obras_sociales')
        .optional()
        .isArray().withMessage('obras_sociales debe ser un arreglo.'),

    body('obras_sociales.*')
        .isInt({ min: 1 }).withMessage('Cada id de obra_social debe ser un número entero positivo.'),
];


// (todos los campos son opcionales)
export const validarActualizarMedico = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.'),

    body('id_usuario')
        .optional()
        .isInt({ min: 1 }).withMessage('El id_usuario debe ser un número entero positivo.'),

    body('id_especialidad')
        .optional()
        .isInt({ min: 1 }).withMessage('El id_especialidad debe ser un número entero positivo.'),

    body('matricula')
        .optional()
        .isString().withMessage('La matrícula debe ser texto.')
        .isLength({ min: 1, max: 50 }).withMessage('La matrícula debe tener entre 1 y 50 caracteres.')
        .trim(),

    body('descripcion')
        .optional()
        .isString().withMessage('La descripción debe ser texto.')
        .isLength({ max: 255 }).withMessage('La descripción no puede superar los 255 caracteres.')
        .trim(),

    body('valor_consulta')
        .optional()
        .isFloat({ min: 0 }).withMessage('El valor_consulta debe ser un número positivo.'),

    body('obras_sociales')
        .optional()
        .isArray().withMessage('obras_sociales debe ser un arreglo.'),

    body('obras_sociales.*')
        .isInt({ min: 1 }).withMessage('Cada id de obra_social debe ser un número entero positivo.'),
];


export const validarIdMedico = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.'),
];
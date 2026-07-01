import { body } from 'express-validator';

export const validarLogin = [
    body('email')
        .notEmpty().withMessage('El email es obligatorio.')
        .isEmail().withMessage('El email debe tener un formato válido.')
        .trim(),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isString().withMessage('La contraseña debe ser texto.'),
];
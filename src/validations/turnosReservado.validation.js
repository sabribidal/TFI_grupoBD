import {check, param} from "express-validator";

export const validarTurnoReserva = [
    check('id_medico')
        .notEmpty().withMessage('El id_medico es obligatorio, por favor ingrese un valor')
        .isInt({ min: 1 }).withMessage('El id_medico debe ser un número entero positivo'),
    check('id_paciente')
        .notEmpty().withMessage('El id_paciente es obligatorio, por favor ingrese un valor')
        .isInt({ min: 1 }).withMessage('El id_paciente debe ser un número entero positivo'),
    check('fecha_hora')
        .notEmpty().withMessage('La fecha y hora es obligatoria, por favor ingrese un valor')
    ]
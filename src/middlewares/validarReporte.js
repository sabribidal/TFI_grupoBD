function validarReporte(req, res, next) {
    const { medicoId, fecha } = req.params;

    if (!medicoId || isNaN(medicoId)) {
        return res.status(400).json({
            estado: 'error',
            mensaje: 'ID de médico inválido',
        });
    }

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fecha || !fechaRegex.test(fecha)) {
        return res.status(400).json({
            estado: 'error',
            mensaje: 'Fecha inválida. El formato debe ser YYYY-MM-DD',
        });
    }

    next();
}

export { validarReporte };


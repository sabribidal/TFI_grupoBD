import PDFDocument from 'pdfkit';

export function crearPDFReporte(datosReporte) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];

        // Ir guardando los fragmentos del PDF en un array de buffers
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer); // Devolver el PDF como un buffer
        });
        doc.on('error', (err) => {
            reject(err);
        });

        // Diseño del PDF
        doc.fontSize(20).text('Reporte de Turnos', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Medico: ${datosReporte.medico.apellido} ${datosReporte.medico.nombres}`);
        doc.text(`Fecha: ${datosReporte.fecha}`);
        doc.moveDown();

        // Listar los turnos
        datosReporte.turnos.forEach((turno) => {
            doc.fontSize(11).text(`Hora: ${turno.hora} - Paciente: ${turno.paciente.nombre_completo} - Obra Social: (${turno.paciente.obra_social})`);
            doc.moveDown(0.2);
        });

        // Finalizar el PDF
        doc.end();
    });
}

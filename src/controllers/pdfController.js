import { check, param } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';

import PDFService from '../services/pdfService.js';
import { crearPDFReporte, crearPDFReporteMensual } from '../utils/pdfGenerador.js';

class PDFController {
    constructor() {
        this.pdfService = new PDFService();
    }

    buscarMedicos = async (req, res) => {
        try {
            const medicos = await this.pdfService.buscarMedicos();
            res.status(200).json(medicos);
        } catch (error) {
            console.error('Error al buscar médicos:', error);
            res.status(500).json({ error: 'Error al buscar médicos' });
        }
    }

    buscarEspecialidades = async (req, res) => {
        try {
            const especialidades = await this.pdfService.buscarEspecialidades();
            res.status(200).json(especialidades);
        } catch (error) {
            console.error('Error al buscar especialidades:', error);
            res.status(500).json({ error: 'Error al buscar especialidades' });
        }
    }

    buscarPacientesMedico = async (req, res) => {
        try {
            const { idMedico, fecha } = req.params;
            const pacientes = await this.pdfService.buscarPacientesMedico(idMedico, fecha);
            res.status(200).json(pacientes);
        } catch (error) {
            console.error('Error al buscar pacientes:', error);
            res.status(500).json({ error: 'Error al buscar pacientes' });
        }
    }

    generarReportePDF = async (req, res) => {
        try {
            const { medicoId, fecha } = req.params;

            // Obtenemos los datos necesarios para el reporte
            const filas = await this.pdfService.buscarPacientesMedico(medicoId, fecha);

            if (!filas || filas.length === 0) {
                return res.status(404).json({ error: 'No se encontraron turnos para el médico y fecha especificados' });
            }

            // Estructurar los datos para el PDF
            const datosReporte = {
                medico: { apellido: filas[0].medico_apellido, nombres: filas[0].medico_nombres },
                fecha: fecha,
                turnos: filas.map(f => ({
                    id_turno: f.id_turno_reserva,
                    hora: f.fecha_hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    valor: f.valor_total,
                    atendido: f.atendido ? 'Sí' : 'No',
                    paciente: {
                        nombre_completo: `${f.paciente_apellido} ${f.paciente_nombres}`,
                        obra_social: f.descripcion_obra_social || 'Particular'
                    }
                }))
            };

            // Generar el PDF
            const pdfBuffer = await crearPDFReporte(datosReporte);

            // Respuesta HTTP
            // Configurar las cabeceras para la descarga del PDF
            res.setHeader('Content-Type', 'application/pdf');

            // Opcion para que el PDF se abra en el navegador en lugar de descargarse
            res.setHeader('Content-Disposition', 'inline; filename=reporte_turnos.pdf');

            // Opcion para que el PDF se descargue automáticamente
            // res.setHeader('Content-Disposition', 'attachment; filename=reporte_turnos.pdf');

            // Enviar el PDF como respuesta
            res.send(pdfBuffer);

        } catch (error) {
            console.error('Error al generar el PDF:', error);
            res.status(500).json({ error: 'Error al generar el PDF' });
        }
    }

    generarReporteMensual = async (req, res) => {
    try {
        const { anio, mes } = req.params;

        const datos = await this.pdfService.obtenerPacientesAtendidosPorMes(anio, mes);

        if (!datos || datos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron datos para el período indicado' });
        }

        // Armar objeto para el generador
        const datosReporte = {
            anio,
            mes,
            medicos: datos.map(d => ({
                id_medico: d.id_medico,
                apellido: d.apellido,
                nombres: d.nombres,
                email: d.email,
                total_atendidos: d.total_atendidos
            }))
        };

        const pdfBuffer = await crearPDFReporteMensual(datosReporte);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=reporte_mensual.pdf');
        res.send(pdfBuffer);

    } catch (error) {
        console.error('Error al generar reporte mensual:', error);
        res.status(500).json({ error: 'Error al generar el reporte mensual' });
    }
}
}

export default PDFController;

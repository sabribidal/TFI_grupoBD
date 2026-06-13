import PDF from '../database/pdf.js';

export default class PDFService {

    constructor() {
        this.pdf = new PDF();
    }

    buscarMedicos = async () => {
        return await this.pdf.buscarMedicos();
    }

    buscarEspecialidades = async () => {
        return await this.pdf.buscarEspecialidades();
    }

    buscarPacientesMedico = async (idMedico, fecha) => {
        return await this.pdf.buscarPacientesMedico(idMedico, fecha);
    }

}

import TurnosReservado from "../database/TurnosReservado.js";
import ObrasSocialesService from "./obras_sociales.service.js";
import MedicosService from "./medicos.service.js";
import PacientesService from "./pacientes.service.js";

export default class TurnosReservadoService{
    constructor(){
        this.turnoReserva = new TurnosReservado();
        this.obraSociales = new ObrasSocialesService();
        this.medicos = new MedicosService(); 
        this.pacientes = new PacientesService(); 
    }

    buscarTodas = async (usuario) => {
        if (usuario.rol === 1){
            return this.turnoReserva.medicoTurnos(usuario.id);
        } else {
            return this.turnoReserva.pacienteTurnos(usuario.id);
        }
    }

    crear = async (TurnosReserva) =>{
        const medico = await this.medicos.buscarPorId(TurnosReserva.id_medico);

        if (!medico) {
            const error = new Error(`No se encontró el médico con ID ${TurnosReserva.id_medico}.`);
            error.status = 404;
            throw error;
        }

        const paciente = await this.pacientes.buscarPorId(TurnosReserva.id_paciente);

        if (!paciente) {
            const error = new Error(`No se encontró el paciente con ID ${TurnosReserva.id_paciente}.`);
            error.status = 404;
            throw error;
        }

        const obra_social = await this.obraSociales.buscarPorId(paciente.id_obra_social);

        let valor = medico.valor_consulta;

        if (obra_social && obra_social.es_particular === 0){
            valor = valor - (obra_social.porcentaje_descuento * valor);
        }

        TurnosReserva.valor_total = valor;
        TurnosReserva.id_obra_social = paciente.id_obra_social;

        const id_nuevo = await this.turnoReserva.crear(TurnosReserva);
        return id_nuevo;
    }
}
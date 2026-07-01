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

    crear = async (TurnosReserva, usuarioAutenticado) => {

        let id_paciente = TurnosReserva.id_paciente;

        if (usuarioAutenticado.rol === 2) {

            const pacientePropio = await this.pacientes.buscarPorUsuario(usuarioAutenticado.id);

            if (!pacientePropio) {
                const error = new Error('No se encontró el registro de paciente asociado a tu usuario.');
                error.status = 404;
                throw error;
            }

            id_paciente = pacientePropio.id_paciente;
        }

        if (usuarioAutenticado.rol === 3 && !id_paciente) {
            const error = new Error('Debe indicar el id_paciente para registrar el turno.');
            error.status = 400;
            throw error;
        }

        const medico = await this.medicos.buscarPorId(TurnosReserva.id_medico);

        if (!medico) {
            const error = new Error(`No se encontró el médico con ID ${TurnosReserva.id_medico}.`);
            error.status = 404;
            throw error;
        }

        const paciente = await this.pacientes.buscarPorId(id_paciente);

        if (!paciente) {
            const error = new Error(`No se encontró el paciente con ID ${id_paciente}.`);
            error.status = 404;
            throw error;
        }

        const obra_social = await this.obraSociales.buscarPorId(paciente.id_obra_social);

        let valor = medico.valor_consulta;

        if (obra_social && obra_social.es_particular === 0){
            valor = valor - (obra_social.porcentaje_descuento * valor);
        }

        TurnosReserva.id_paciente = id_paciente;
        TurnosReserva.valor_total = valor;
        TurnosReserva.id_obra_social = paciente.id_obra_social;

        const id_nuevo = await this.turnoReserva.crear(TurnosReserva);
        return id_nuevo;
    }

    marcarAtendido = async (id_turno_reserva, usuarioAutenticado) => {

        const filasAfectadas = await this.turnoReserva.marcarAtendido(
            id_turno_reserva,
            usuarioAutenticado.id
        );

        if (filasAfectadas === 0) {
            const error = new Error('No se encontró el turno, ya fue atendido, o no pertenece a este médico.');
            error.status = 404;
            throw error;
        }

        return true;
    }
}
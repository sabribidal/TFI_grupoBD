import TurnosReservado from "../database/TurnosReservado.js";
import ObrasSocialesService from "./obras_sociales.service.js";

export default class TurnosReservadoService{
    constructor(){
        this.turnoReserva = new TurnosReservado();
        this.obraSociales = new ObrasSocialesService();
        this.medicos = 0; //Falta archivo de servicios de medicos 
        this.pacientes = 0; //Falta archivo de servicios de pacientes
    }

    buscarTodas = async (usuario) => {
        if (usuario.rol === 1){
            return this.turnoReserva.medicoTurnos(usuario.id_usuario);
        } else {
            return this.turnoReserva.pacienteTurnos(usuario.id_usuario);
        }
    }

    crear = async (TurnosReserva) =>{
        const medico = 0 // Falta archivo conexion a BD de medicos 
        const paciente = 0  //Falta archivo conexion a BD de pacientes
        const obra_social = await this.obraSociales.buscarPorId(paciente.id_obra_social);
        
        let valor = 0; // Valor de la consulta del medico

        if (obra_social.es_particular === 0){
            valor = valor - (obra_social.porcentaje_descuento * valor)
        }

        TurnosReserva.valor_total = valor 
        TurnosReserva.id_obra_social = paciente.id_obra_social

        const id_nuevo = this.turnoReserva.crear(TurnosReserva);
        return id_nuevo
    }
}   
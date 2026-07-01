import TurnosReservadoService from "../services/TurnosReservado.service.js";

export default class TurnosReservadoController{
    constructor(){
        this.turnoReserva = new TurnosReservadoService(); 
    }

    crear = async (req, res) => {
        try{
            const turnoReserva = req.body;
            const nuevoTurnoReserva = await this.turnoReserva.crear(turnoReserva, req.user);
            if (!nuevoTurnoReserva || nuevoTurnoReserva.length === 0){
                return res.status(400).json({
                    estado: false,
                    mensaje: 'No se logro crear el turno. '
                })
            }
            return res.status(201).json({
                estado:true,
                mensaje: 'Turno creado exitosamente.',
                datos: nuevoTurnoReserva
            });

        } catch (error){
            console.log(`Error en POST ${error}`)

            if (error.status === 404 || error.status === 400) {
                return res.status(error.status).json({
                    estado: false,
                    mensaje: error.message
                });
            }

            res.status(500).json({
                estado:false,
                mensaje:'Error interno '
            });
        }
    }

    atender = async (req, res) => {
        try {
            const id_turno_reserva = parseInt(req.params.id);

            await this.turnoReserva.marcarAtendido(id_turno_reserva, req.user);

            return res.status(200).json({
                estado: true,
                mensaje: 'Turno marcado como atendido correctamente.'
            });

        } catch (error) {
            console.log(`Error en PUT atender ${error}`)

            if (error.status === 404) {
                return res.status(404).json({
                    estado: false,
                    mensaje: error.message
                });
            }

            return res.status(500).json({
                estado: false,
                mensaje: 'Error interno'
            });
        }
    }

    buscarTodos=async(req, res)=>{
        try{
            const turnos = await this.turnoReserva.buscarTodas(req.user);
            res.status(200).json({
                estado:true,
                mensaje:'Turnos obtenidos',
                turnos: turnos
            });
        } catch (error){
            console.log(`Error en GET ${error}`)
            res.status(500).json({
                estado:false,
                mensaje:'Error interno'
            });
        }
    }
    
}
import { pool } from "./conexion.js";

export default class TurnosReservado{

    crear = async(turnoReserva)=>{
        const conexion = await pool.getConnection();

        try{
            await conexion.beginTransaction();

            const {id_medico, id_paciente, id_obra_social, fecha_hora, valor_total}=turnoReserva;
            const sql=`INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total) VALUES (?,?,?,?,?)`;
            const [result]=await conexion.execute(sql, [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total]);

            if (result.affectedRows === 0){
                await conexion.rollback();
                return null;
            }

            await conexion.commit();
            return result.insertId;

        } catch (error){
            await conexion.rollback();
            console.error('[TurnosReservado.crear]', error.message);
            throw error;
        } finally {
            conexion.release();
        }
    }

    medicoTurnos = async (id_usuario) => {
        const sql = `SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atendido,
                        p.id_paciente, p.apellido AS paciente_apellido, p.nombres AS paciente_nombres
                FROM usuarios AS u
                INNER JOIN medicos AS m ON m.id_usuario = u.id_usuario
                INNER JOIN turnos_reservas AS tr ON tr.id_medico = m.id_medico
                INNER JOIN v_pacientes AS p ON p.id_paciente = tr.id_paciente
                WHERE m.id_usuario = ? AND tr.activo = 1
                ORDER BY tr.fecha_hora ASC`
        const [turnos] = await pool.execute(sql, [id_usuario]);
        return turnos;
    }

    pacienteTurnos = async (id_usuario) => {
        const sql = `SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atendido,
                        m.id_medico, m.apellido AS medico_apellido, m.nombres AS medico_nombres
                        FROM usuarios as u
                        INNER JOIN pacientes AS p ON p.id_usuario = u.id_usuario
                        INNER JOIN turnos_reservas AS tr ON tr.id_paciente = p.id_paciente
                        INNER JOIN v_medicos AS m ON m.id_medico = tr.id_medico
                        WHERE u.id_usuario = ? AND tr.activo = 1
                        ORDER BY tr.fecha_hora ASC`
        const [turnos] = await pool.execute(sql, [id_usuario]);
        return turnos;
    }

    marcarAtendido = async (id_turno_reserva, id_usuario_medico) => {
        const sql = `
            UPDATE turnos_reservas tr
            INNER JOIN medicos m ON m.id_medico = tr.id_medico
            SET tr.atendido = 1
            WHERE tr.id_turno_reserva = ?
              AND m.id_usuario = ?
              AND tr.activo = 1
        `;
        const [result] = await pool.execute(sql, [id_turno_reserva, id_usuario_medico]);
        return result.affectedRows;
    }
}
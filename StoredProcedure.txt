DELIMITER $$

CREATE PROCEDURE sp_buscar_pacientes_medico(
    IN p_id_medico INT,
    IN p_fecha DATE
)
BEGIN
    SELECT
        m.apellido AS medico_apellido,
        m.nombres AS medico_nombres,
        tr.id_turno_reserva,
        tr.fecha_hora,
        tr.valor_total,
        tr.atentido,
        p.id_paciente,
        p.apellido AS paciente_apellido,
        p.nombres AS paciente_nombres,
        p.email,
        p.descripcion_obra_social
    FROM turnos_reservas tr
    INNER JOIN v_pacientes p ON tr.id_paciente = p.id_paciente
    INNER JOIN v_medicos m ON tr.id_medico = m.id_medico
    WHERE tr.id_medico = p_id_medico
      AND DATE(tr.fecha_hora) = p_fecha
      AND tr.activo = 1
    ORDER BY tr.fecha_hora ASC;
END $$

DELIMITER ;
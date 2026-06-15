import { pool } from './conexion.js';

export default class Pacientes {

    buscarTodas = async () => {
        const sql = `
            SELECT *
            FROM v_pacientes
        `;

        const [rows] = await pool.query(sql);
        return rows;
    }

    buscarPorId = async (id) => {

        const sql = `
            SELECT *
            FROM v_pacientes
            WHERE id_paciente = ?
        `;

        const [rows] = await pool.execute(sql, [id]);

        return rows[0] ?? null;
    }

    crear = async (paciente) => {

        const sql = `
            INSERT INTO pacientes
            (id_usuario, id_obra_social)
            VALUES (?, ?)
        `;

        const [result] = await pool.execute(sql, [
            paciente.id_usuario,
            paciente.id_obra_social
        ]);

        return await this.buscarPorId(result.insertId);
    }

    actualizar = async (id, paciente) => {

        const sql = `
            UPDATE pacientes
            SET id_usuario = ?,
                id_obra_social = ?
            WHERE id_paciente = ?
        `;

        await pool.execute(sql, [
            paciente.id_usuario,
            paciente.id_obra_social,
            id
        ]);

        return await this.buscarPorId(id);
    }

    eliminar = async (id) => {

        const paciente = await this.buscarPorId(id);

        if (!paciente) {
            return null;
        }

        const sql = `
            UPDATE usuarios
            SET activo = 0
            WHERE id_usuario = ?
        `;

        await pool.execute(sql, [paciente.id_usuario]);

        return true;
    }

}
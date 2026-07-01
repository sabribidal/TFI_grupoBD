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

    buscarPorUsuario = async (id_usuario) => {

        const sql = `
            SELECT *
            FROM v_pacientes
            WHERE id_usuario = ?
        `;

        const [rows] = await pool.execute(sql, [id_usuario]);

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

        const { id_usuario, id_obra_social } = paciente;

        const campos = [];
        const valores = [];

        if (id_usuario !== undefined) {
            campos.push('id_usuario = ?');
            valores.push(id_usuario);
        }

        if (id_obra_social !== undefined) {
            campos.push('id_obra_social = ?');
            valores.push(id_obra_social);
        }

        if (campos.length === 0) {
            return await this.buscarPorId(id);
        }

        valores.push(id);

        const sql = `UPDATE pacientes SET ${campos.join(', ')} WHERE id_paciente = ?`;
        await pool.execute(sql, valores);

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
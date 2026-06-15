import { pool } from './conexion.js';

export default class Medicos {

    buscarTodas = async () => {
        const sql = 'SELECT * FROM v_medicos';
        const [rows] = await pool.query(sql);
        return rows;
    }

    buscarPorId = async (id) => {
        const sql = 'SELECT * FROM v_medicos WHERE id_medico = ?';
        const [rows] = await pool.execute(sql, [id]);
        return rows[0] ?? null;
    }

    crear = async (medico) => {

        const {
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        } = medico;

        const sql = `
            INSERT INTO medicos
            (
                id_usuario,
                id_especialidad,
                matricula,
                descripcion,
                valor_consulta
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(sql, [
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        ]);

        return await this.buscarPorId(result.insertId);
    }

    actualizar = async (id, medico) => {

        const {
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        } = medico;

        const sql = `
            UPDATE medicos
            SET
                id_usuario = ?,
                id_especialidad = ?,
                matricula = ?,
                descripcion = ?,
                valor_consulta = ?
            WHERE id_medico = ?
        `;

        await pool.execute(sql, [
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta,
            id
        ]);

        return await this.buscarPorId(id);
    }

    eliminar = async (id) => {

        const medico = await this.buscarPorId(id);

        const sql = `
            UPDATE usuarios
            SET activo = 0
            WHERE id_usuario = ?
        `;

        await pool.execute(sql, [medico.id_usuario]);
    }

}
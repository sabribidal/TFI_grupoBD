import { pool } from './conexion.js';


export default class Especialidades {

    buscarTodas = async () => {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1';
        const [rows] = await pool.query(sql);
        return rows;
    }

    buscarPorId = async (id) => {
        const sql = 'SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1';
        const [rows] = await pool.execute(sql, [id]);
        return rows[0] ?? null;
    }

    crear = async (especialidad) => {
        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';
        const [result] = await pool.execute(sql, [especialidad.nombre]);
        
        return await this.buscarPorId(result.insertId);
    }

    actualizar = async (id, especialidad) => {
        const sql = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1';
        await pool.execute(sql, [especialidad.nombre, id]);
        return await this.buscarPorId(id);
    }

    // Se marca como inactivo, no se borra
    eliminar = async (id) => {
        const sql = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?';
        await pool.execute(sql, [id]);
    }
}
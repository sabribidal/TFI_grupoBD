import { pool } from './conexion.js';

export default class Especialidades {

    buscarTodas = async () => {
        try {
            const consulta = 'SELECT * FROM especialidades WHERE activo=1';
            const [especialidades] = await pool.query(consulta);
            return especialidades;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    buscarPorId = async (id_especialidad) => {
        try {
            const consulta = 'SELECT * FROM especialidades WHERE activo=1 AND id_especialidad=?';
            const [rows] = await pool.query(consulta, [id_especialidad]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    crear = async (especialidad) => {
        try {
            const consulta = 'INSERT INTO especialidades (nombre) VALUES (?)';
            const [result] = await pool.execute(consulta, [especialidad.nombre]);
            return { id_especialidad: result.insertId, nombre: especialidad.nombre };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    actualizar = async (id_especialidad, especialidad) => {
        try {
            const consulta = 'UPDATE especialidades SET nombre=? WHERE id_especialidad=?';
            const [result] = await pool.execute(consulta, [especialidad.nombre, id_especialidad]);
            return { id_especialidad, nombre: especialidad.nombre, affectedRows: result.affectedRows };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    eliminar = async (id_especialidad) => {
        try {
            const consultaEliminar = 'UPDATE especialidades SET activo=0 WHERE id_especialidad=?';
            const [result] = await pool.execute(consultaEliminar, [id_especialidad]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
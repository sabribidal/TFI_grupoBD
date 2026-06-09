import { pool } from './conexion.js';


export default class ObrasSociales {

    buscarTodas = async () => {
        const sql = 'SELECT * FROM obras_sociales WHERE activo = 1';
        const [rows] = await pool.query(sql);
        return rows;
    }


    buscarPorId = async (id) => {
        const sql = 'SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1';
        const [rows] = await pool.execute(sql, [id]);
        return rows[0] ?? null;
    }


    crear = async (obraSocial) => {
        const { nombre, descripcion, porcentaje_descuento, es_particular } = obraSocial;
        const sql = `
            INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await pool.execute(sql, [
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular ?? 0  // si no se envia, por defecto NO ES PARTICULAR
        ]);
        return await this.buscarPorId(result.insertId);
    }


    actualizar = async (id, obraSocial) => {
        const { nombre, descripcion, porcentaje_descuento, es_particular } = obraSocial;

        const campos = [];
        const valores = [];

        if (nombre !== undefined) {
            campos.push('nombre = ?');
            valores.push(nombre); 
        }

        if (descripcion !== undefined) {
            campos.push('descripcion = ?');
            valores.push(descripcion);
        }
        
        if (porcentaje_descuento !== undefined) {
            campos.push('porcentaje_descuento = ?');
            valores.push(porcentaje_descuento);
        }

        if (es_particular !== undefined) {
            campos.push('es_particular = ?');
            valores.push(es_particular);
        }

        valores.push(id);

        const sql = `UPDATE obras_sociales SET ${campos.join(', ')} WHERE id_obra_social = ? AND activo = 1`;
        await pool.execute(sql, valores);
        return await this.buscarPorId(id);
    }


    // No se borra, se marca como inactiva
    eliminar = async (id) => {
        const sql = 'UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?';
        await pool.execute(sql, [id]);
    }
}
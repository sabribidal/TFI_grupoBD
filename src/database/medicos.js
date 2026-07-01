import { pool } from './conexion.js';

export default class Medicos {

    // Devuelve las obras sociales asociadas a un medico
    buscarObrasSocialesPorMedico = async (id_medico) => {
        const sql = `
            SELECT os.id_obra_social, os.nombre, os.descripcion, os.porcentaje_descuento, os.es_particular
            FROM medicos_obras_sociales mos
            JOIN obras_sociales os ON os.id_obra_social = mos.id_obra_social
            WHERE mos.id_medico = ?
        `;
        const [rows] = await pool.execute(sql, [id_medico]);
        return rows;
    }

    buscarTodas = async () => {
        const sql = 'SELECT * FROM v_medicos';
        const [rows] = await pool.query(sql);

        const medicos = await Promise.all(
            rows.map(async (medico) => ({
                ...medico,
                obras_sociales: await this.buscarObrasSocialesPorMedico(medico.id_medico),
            }))
        );

        return medicos;
    }

    buscarPorId = async (id) => {
        const sql = 'SELECT * FROM v_medicos WHERE id_medico = ?';
        const [rows] = await pool.execute(sql, [id]);
        const medico = rows[0] ?? null;

        if (!medico) return null;

        medico.obras_sociales = await this.buscarObrasSocialesPorMedico(medico.id_medico);
        return medico;
    }

    buscarPorEspecialidad = async (id_especialidad) => {
        const sql = `
            SELECT vm.*
            FROM v_medicos vm
            JOIN medicos m ON vm.id_medico = m.id_medico
            WHERE m.id_especialidad = ?
        `;
        const [rows] = await pool.execute(sql, [id_especialidad]);

        const medicos = await Promise.all(
            rows.map(async (medico) => ({
                ...medico,
                obras_sociales: await this.buscarObrasSocialesPorMedico(medico.id_medico),
            }))
        );

        return medicos;
    }

    // Reemplaza por completo las relaciones medico-obra_social.
    // Recibe la conexion de una transaccion ya abierta (no usa el pool directamente).
    _reemplazarObrasSociales = async (conexion, id_medico, obras_sociales) => {

        await conexion.execute(
            'DELETE FROM medicos_obras_sociales WHERE id_medico = ?',
            [id_medico]
        );

        if (obras_sociales && obras_sociales.length > 0) {
            const valores = obras_sociales.map((id_obra_social) => [id_medico, id_obra_social]);

            await conexion.query(
                'INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES ?',
                [valores]
            );
        }
    }

    crear = async (medico) => {

        const {
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta,
            obras_sociales
        } = medico;

        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

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

            const [result] = await conexion.execute(sql, [
                id_usuario,
                id_especialidad,
                matricula,
                descripcion ?? null,
                valor_consulta
            ]);

            const id_medico = result.insertId;

            if (obras_sociales !== undefined) {
                await this._reemplazarObrasSociales(conexion, id_medico, obras_sociales);
            }

            await conexion.commit();

            return await this.buscarPorId(id_medico);

        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    }

    actualizar = async (id, medico) => {

        const {
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta,
            obras_sociales
        } = medico;

        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const campos = [];
            const valores = [];

            if (id_usuario !== undefined) {
                campos.push('id_usuario = ?');
                valores.push(id_usuario);
            }

            if (id_especialidad !== undefined) {
                campos.push('id_especialidad = ?');
                valores.push(id_especialidad);
            }

            if (matricula !== undefined) {
                campos.push('matricula = ?');
                valores.push(matricula);
            }

            if (descripcion !== undefined) {
                campos.push('descripcion = ?');
                valores.push(descripcion ?? null);
            }

            if (valor_consulta !== undefined) {
                campos.push('valor_consulta = ?');
                valores.push(valor_consulta);
            }

            if (campos.length > 0) {
                valores.push(id);
                const sql = `UPDATE medicos SET ${campos.join(', ')} WHERE id_medico = ?`;
                await conexion.execute(sql, valores);
            }

            if (obras_sociales !== undefined) {
                await this._reemplazarObrasSociales(conexion, id, obras_sociales);
            }

            await conexion.commit();

            return await this.buscarPorId(id);

        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
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
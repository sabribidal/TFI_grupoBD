import {pool} from './conexion.js';

export default class PDF {

    buscarMedicos = async () => {
        const sql = 'SELECT * FROM v_medicos';
        const [medicos] = await pool.query(sql);
        return medicos;
    }

    buscarEspecialidades = async () => {
        const sql = 'SELECT * FROM especialidades';
        const [especialidades] = await pool.query(sql);
        return especialidades;
    }

    buscarPacientesMedico = async (idMedico, fecha) => {
        const sql = `CALL sp_buscar_pacientes_medico(?, ?)`;
      
        const [pacientes] = await pool.query(sql, [idMedico, fecha]);
        // MySQL devuelve un array de resultados para cada conjunto de resultados
        return pacientes[0] || [];
    }
}

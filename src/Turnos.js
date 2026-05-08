console.log('TPI');
console.log('Turnos - API REST Grupo Axel - Emili - Sabrina - Santiago - Daniel');

import express from 'express';
import dotenv from 'dotenv';
import { pool } from './database/conexion.js';
import { testConexion } from './database/test_conexion.js';
import { router as v1EspecialidadesRutas } from './routes/v1/especialidadesRutas.js';

dotenv.config();

const app = express();
await testConexion(); // Llamar a la función de prueba de conexión
app.use(express.json());

app.get('/', (req, res) => {
    //res.status(200).send({'estado': 'ok', 'mensaje': 'Servidor funcionando correctamente'});
    res.send({'status': 'ok', 'message': 'Servidor funcionando correctamente'});
});

app.use('/api/v1/especialidades', v1EspecialidadesRutas);

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log('Server is running on port ' + (PUERTO || 3000));
});
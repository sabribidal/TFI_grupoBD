console.log('TPI');
console.log('Turnos - API REST Grupo Axel - Emili - Sabrina - Santiago - Daniel');

import express from 'express';
import dotenv from 'dotenv';
import { pool } from './database/conexion.js';
import { testConexion } from './database/test_conexion.js';
import { router as v1EspecialidadesRutas } from './routes/v1/especialidadesRutas.js';
import { router as v1ObrasSocialesRutas } from './routes/v1/obrasSocialesRutas.js';
import { router as v1MedicosRutas } from './routes/v1/medicosRutas.js';
import { router as v1PdfRutas } from './routes/v1/pdfRutas.js';
import { router as v1TurnosReservaRutas } from './routes/v1/turnosReservaRutas.js';
import v1PacientesRutas from './routes/v1/pacientesRutas.js';
import { createRequire } from 'module';
import swaggerUI from 'swagger-ui-express';

import authRouter from "./routes/AuthRouter.js";
import passport from "./middlewares/passport.js";
import morgan from "morgan";
import path from "path";

const require = createRequire(import.meta.url);
const swaggerDocument = require('../swagger_output.json');

dotenv.config();
if (typeof process.loadEnvFile === 'function') process.loadEnvFile();

const app = express();

await testConexion(); // Llamar a la función de prueba de conexión
app.use(express.json());

app.get('/', (req, res) => {
    res.send({'status': 'ok', 'message': 'Servidor funcionando correctamente'});
});

app.use(morgan("dev"));
app.use('/api/v1/especialidades', v1EspecialidadesRutas);
app.use('/api/v1/obras-sociales', v1ObrasSocialesRutas);
app.use('/api/v1/medicos', v1MedicosRutas);
app.use('/api/v1/pacientes', v1PacientesRutas);
app.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/auth", authRouter);
app.use("/uploads", express.static("uploads"));
app.use('/api/v1/pdf', v1PdfRutas);
app.use('/api/v1/turnos-reservados', v1TurnosReservaRutas);
app.use(passport.initialize());
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log('Server is running on port ' + (PUERTO || 3000));
});
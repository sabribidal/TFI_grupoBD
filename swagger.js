import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/turnos.js'];

const doc = {
  info: {
    title: 'Turnos API Programacion III - 2026',
    description: 'API para gestionar turnos grupo Integrado por Emili Lange, Sabrina Bidal, Santiago Ramírez, Axel Barzola y Daniel Miños ',
    },  
    host: 'localhost:3000',
    schemes: ['http'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);

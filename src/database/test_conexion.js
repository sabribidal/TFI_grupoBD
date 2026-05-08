import { pool}  from './conexion.js'

export async function testConexion() {
    try {
        const conexion = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos');


        conexion.release(); // Liberar la conexión después de usarla
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        console.error({
            codigo: error.code,
            mensaje: 'Error de conexión:',
            descripcion: error.message
        });
        process.exit(1); // Salir del proceso con un código de error
    }
}

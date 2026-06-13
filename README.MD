# API Turnos Médicos

Proyecto desarrollado por alumnos de la Tecnicatura Universitaria en Desarrollo WEB
UNER Concordia - Facultad de Ciencias de la Administración
Año Lectivo: 2026

Integrantes:
Emily Lange
Sabrina Bidal
Santiago Ramírez
Axel Barzola
Daniel Miños

## 🚀 Tecnologías utilizadas
+ **Node.js** - Entorno de ejecución para JavaScript
+ **Express** - Framework web para el enrutamiento y middlewares
+ **MySQL** - Almacenamiento de Datos
+ **Dotenv** - Gestión de variables de entorno
+ **JSON Web Token** -
+ **Passport** -
+ **Morgan** - 
+ **Multer** - 
+ **Swagger** - 
+ **PDFkit** -

## 🛠️ Requisitos previos
Antes de comenzar, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (versión v18 o superior recomendada)
* [npm](https://www.npmjs.com/) o [yarn]
* [MySQL]

## 💻 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/sabribidal/TFI_grupoBD.git
   cd [TFI_grupoBD]

2. Instala dependencias
   ```bash
   npm install

3. Configura las variables de entorno:
Crea un archivo .env en la raíz del proyecto (puedes guiarte del archivo .env.example si lo tienes) y añade tus credenciales:

Fragmento de código
PORT=3000
DB_URL=tu_cadena_de_conexion_aqui
JWT_SECRET=tu_clave_secreta_para_tokens

4. Inicia el servidor en modo de desarrollo:
   ```bash
   npm run dev

   Nota: Asegúrate de tener configurado este script "dev" : "nodemon Turnos.js" en tu package.json

El servidor debería estar corriendo en: http://localhost:3000


🛣️ Endpoint Ejemplo para obtener ayuda de swagger

http://localhost:3000/api/v1/api-docs

🛣️ Endpoint Ejemplo para obtener reporte de atención de médico por fecha

localhost:3000/api/v1/pdf/reporte/3/2026-04-01 - > donde 3 es el id_medico y /2026-04-01 fecha a buscar

📂 Estructura del Proyecto
El proyecto sigue una arquitectura limpia basada en capas:

├── src/
│   ├── config/          # Configuración de base de datos y variables
│   ├── controllers/     # Controladores (manejo de req y res)
│   ├── middlewares/     # Filtros de seguridad, validación, etc.
│   ├── database/        # Modelos de la base de datos
│   ├── routes/          # Definición de rutas de Express
│   ├── services/        # Lógica de negocio e interacción con BD
│   ├── .env             # variables de entorno
│   └── Turnos.js        # Punto de entrada a la aplicación
├── swaggwer.js          # Configuración de swagger
├── .gitignore           # Archivos ignorados por Git (ej: .env y node_modules)
├── swagger_output.json  # EndPoint registrados por swagger
├── package-lock.json    # Registro de versiones exactas, ubicación y dependencias anidadas
└── package.json         # Dependencias y scripts

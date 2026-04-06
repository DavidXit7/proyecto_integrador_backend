// Importamos la versión de promesas de mysql2
import mysql from "mysql2/promise";
// Cargamos las variables de entorno
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../../.env") });

// Creamos un "Pool" de conexiones.
// Es mucho más eficiente que abrir y cerrar una conexión por cada consulta.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10, // Máximo de conexiones simultáneas
  queueLimit: 0,
});

// Prueba de conexión automática al arrancar
pool
  .getConnection()
  .then((connection) => {
    console.log("Conexión a la base de datos MySQL establecida con éxito");
    // Liberamos la conexión de vuelta al pool
    connection.release();
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error.message);
  });

export default pool;
# Integrantes del proyecto: David Rueda - Alejandro Peña - Karen Michelle

# To Do List - Gestion de Tareas

# Propósito del Proyecto
Backend construido con Node.js, Express y MySQL para gestionar la persistencia de datos de usuarios y tareas masivas. Provee una API REST segura para servir a la interfaz de usuario en el frontend:

*   Gestión centralizada de usuarios con borrado lógico (Soft Delete).
*   Control de asignaciones de tareas múltiples sincronizadas.
*   Cálculo de estados de tareas por usuario individual.
*   Proveer una API estable y escalable bajo arquitectura MVC.

# Tecnologías Utilizadas
*   **Node.js** — Entorno de ejecución de JS en el servidor.
*   **Express** — Framework para la creación de rutas y middlewares de la API.
*   **MySQL** — Base de datos relacional para el almacenamiento persistente.
*   **Dotenv** — Gestión segura de configuraciones mediante variables de entorno (.env).
*   **CORS** — Middleware para permitir el intercambio de recursos entre orígenes.
*   **JavaScript (ES6+)** — Lógica asíncrona avanzada para consultas a la DB.

# Estructura del Proyecto
```text
proyecto_integrador_backend/
├── sql/                          # Scripts de creación de la base de datos
│   └── database.sql              # Definición de tablas y relaciones
├── src/                          # Directorio de código fuente
│   ├── config/                   # Configuración del servidor y DB
│   │   └── db.js                 # Conector a MySQL mediante pool
│   ├── controllers/              # Lógica de manejo de peticiones
│   │   ├── tasks.controller.js   # Gestión de tareas y estados
│   │   ├── users.controller.js   # Gestión de usuarios y Soft Delete
│   │   └── metadata.controller.js # Metadatos (ciudades, géneros)
│   ├── models/                   # Modelos de datos y consultas SQL
│   │   ├── task.model.js         # Queries complejas para tareas
│   │   ├── user.model.js         # Queries para usuarios (vincular/desvincular)
│   │   └── metadata.model.js     # Queries para tablas paramétricas
│   ├── routes/                   # Definición de los puntos finales de la API
│   │   ├── tasks.routes.js       # Rutas para el CRUD de tareas
│   │   └── users.routes.js       # Rutas para el CRUD de usuarios
│   └── main.js                   # Configuración de rutas y subida del servidor
├── .env                          # Variables de entorno (No se incluye en Git)
├── package.json                  # Dependencias y scripts
└── server.js                     # Punto de entrada principal
```

# Requisitos Previos
Antes de ejecutar el proyecto es necesario tener instalado:
*   Node.js versión 18 o superior.
*   Servidor MySQL (XAMPP, WAMP o nativo).
*   La base de datos MySQL debe estar corriendo.

# Configuración de la API
1.  Asegúrate de que tu servidor MySQL esté encendido.
2.  Importa el script SQL de la carpeta `sql/database.sql` en tu gestor de base de datos.
3.  Crea un archivo `.env` en la raíz del proyecto y configura tus credenciales:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_password
    DB_NAME=nombre_de_tu_bd
    PORT=3000
    ```

# Cómo ejecutar el proyecto
### Paso 1 — Instalar dependencias
```bash
npm install
```
### Paso 2 — Iniciar el servidor
```bash
npm start
```
### Paso 3 — Verificar
Accede a tu navegador o Postman en:
`http://localhost:3000`

# Características de la Aplicación

### Gestión de Usuarios
*   **Soft Delete**: Los usuarios nunca se borran físicamente; se marcan como inactivos para no perder integridad en las tareas.
*   **CRUD Completo**: Crear, Leer, Actualizar y Eliminar usuarios activos.

### Gestión de Tareas (Lógica Avanzada)
*   **Asignación Múltiple**: Una tarea puede asignarse a N usuarios en un solo envío.
*   **Estados Separados**: Cada usuario mantiene su propio estado (`pendiente`, `completada`) gracias a la tabla intermedia `tarea_usuario`.
*   **Seguridad de Integridad**: Una tarea no puede eliminarse si hay usuarios asignados que aún la tienen pendiente.

# Endpoints de la API

### Usuarios (`/usuarios`)
*   `GET /`: Obtiene lista de usuarios activos.
*   `POST /`: Crea un nuevo usuario.
*   `PUT /:id`: Actualiza datos de un usuario existente.
*   `DELETE /:id`: Realiza un borrado lógico (Soft Delete).

### Tareas (`/tareas`)
*   `GET /`: Obtiene todas las tareas con sus usuarios y estados.
*   `POST /`: Crea una tarea y asigna usuarios simultáneamente.
*   `PUT /:id`: Modifica una tarea (solo si no está 100% finalizada).
*   `DELETE /:id`: Elimina una tarea vacía o archivada.
*   `PUT /finalizar`: Un usuario marca su parte de la tarea como terminada.

### Metadatos (`/metadata`)
*   `GET /ciudades`: Obtiene la lista de ciudades.
*   `GET /generos`: Obtiene la lista de géneros disponibles.

# Manejo de Errores e Integridad
*   Cierre de conexiones inactivas mediante Pool de conexiones.
*   Validación de datos relacionales íntegros.
*   Respuestas de error estandarizadas con códigos HTTP (400, 404, 500).

# Scripts Disponibles
*   `npm start`: Inicia el servidor de producción.
*   `npm run dev`: (Opcional) Inicia servidor con refresco automático si tienes `nodemon`.

# Notas Importantes
*   Asegúrate de que el puerto `3000` no esté ocupado por otra aplicación.
*   El diseño de base de datos está optimizado para integridad referencial.
*   Cualquier cambio en la DB requiere actualizar el archivo `.env`.
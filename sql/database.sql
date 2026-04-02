-- ============================================================
-- BASE DE DATOS: Backend_Grupo_6
-- ============================================================

CREATE DATABASE IF NOT EXISTS Backend_Grupo_6;
USE Backend_Grupo_6;

CREATE TABLE usuarios (
    id          INT          NOT NULL AUTO_INCREMENT,
    documento   VARCHAR(10)  NOT NULL UNIQUE,
    nombre      VARCHAR(150) NOT NULL,
    correo      VARCHAR(255) NOT NULL,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE tareas (
    id           INT          NOT NULL AUTO_INCREMENT,
    titulo       VARCHAR(255) NOT NULL,
    descripcion  TEXT,
    estado       ENUM('pendiente', 'en proceso', 'completada') NOT NULL DEFAULT 'pendiente',
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE tarea_usuario (
    tarea_id    INT NOT NULL,
    usuario_id  INT NOT NULL,
    PRIMARY KEY (tarea_id, usuario_id),
    FOREIGN KEY (tarea_id)   REFERENCES tareas(id)   ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE USER IF NOT EXISTS 'app_user_2994281'@'localhost'
    IDENTIFIED BY '#ADSO_2994281';

GRANT ALL PRIVILEGES ON Backend_Grupo_6.*
    TO 'app_user_2994281'@'localhost';

FLUSH PRIVILEGES;

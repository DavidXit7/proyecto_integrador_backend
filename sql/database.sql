-- ============================================================
-- BASE DE DATOS: Backend_Grupo_6
-- ============================================================

CREATE DATABASE IF NOT EXISTS Backend_Grupo_6;
USE Backend_Grupo_6;

-- ------------------------------------------------------------
-- TABLA: generos
-- ------------------------------------------------------------
CREATE TABLE generos (
    id     INT         NOT NULL AUTO_INCREMENT,
    genero VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO generos (id, genero) VALUES
    (1, 'M'),
    (2, 'F'),
    (3, 'Otro');

-- ------------------------------------------------------------
-- TABLA: ciudades
-- ------------------------------------------------------------
CREATE TABLE ciudades (
    id     INT          NOT NULL AUTO_INCREMENT,
    ciudad VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO ciudades (id, ciudad) VALUES
    (1, 'Bucaramanga'),
    (2, 'Pereira'),
    (3, 'Cali');

-- ------------------------------------------------------------
-- TABLA: usuarios
-- ------------------------------------------------------------
CREATE TABLE usuarios (
    id          INT          NOT NULL AUTO_INCREMENT,
    documento   VARCHAR(10)  NOT NULL UNIQUE,
    nombre      VARCHAR(150) NOT NULL,
    genero_id   INT          NOT NULL,
    ciudad_id   INT          NOT NULL,
    correo      VARCHAR(255) NOT NULL,
    activo      TINYINT      NOT NULL DEFAULT 1,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (genero_id) REFERENCES generos(id),
    FOREIGN KEY (ciudad_id) REFERENCES ciudades(id)
);

-- ------------------------------------------------------------
-- TABLA: tareas
-- ------------------------------------------------------------
CREATE TABLE tareas (
    id           INT          NOT NULL AUTO_INCREMENT,
    titulo       VARCHAR(255) NOT NULL,
    descripcion  TEXT,
    activo       TINYINT      NOT NULL DEFAULT 1,
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------
-- TABLA: tarea_usuario (relacion muchos a muchos)
-- ------------------------------------------------------------
CREATE TABLE tarea_usuario (
    tarea_id   INT NOT NULL,
    usuario_id INT NOT NULL,
    estado     ENUM('pendiente', 'completada') NOT NULL DEFAULT 'pendiente',
    PRIMARY KEY (tarea_id, usuario_id),
    FOREIGN KEY (tarea_id)   REFERENCES tareas(id)   ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
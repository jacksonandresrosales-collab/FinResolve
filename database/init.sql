DROP DATABASE IF EXISTS finresolve_db;
CREATE DATABASE finresolve_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE finresolve_db;

-- =========================================================
-- FINRESOLVE - MODELO BASE MYSQL
-- Stack pensado: Next.js + Spring Boot + MySQL
-- Nota: no se usan ENUM; todo valor de negocio vive en catalogos.
-- =========================================================

CREATE TABLE estado (
    estado_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    estado_descripcion VARCHAR(50) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE empresa (
    empresa_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ruc VARCHAR(13) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    razon_social VARCHAR(150) NOT NULL,
    direccion VARCHAR(200),
    telefono VARCHAR(20),
    correo_electronico VARCHAR(120),
    estado_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT fk_empresa_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id)
) ENGINE=InnoDB;

CREATE TABLE tipo_persona (
    tipo_persona_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tipo_persona_descripcion VARCHAR(60) NOT NULL UNIQUE,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT fk_tipo_persona_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_tipo_persona_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE persona (
    persona_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre1 VARCHAR(60) NOT NULL,
    nombre2 VARCHAR(60),
    apellido1 VARCHAR(60) NOT NULL,
    apellido2 VARCHAR(60),
    identificacion VARCHAR(20) NOT NULL UNIQUE,
    direccion VARCHAR(200),
    telefono VARCHAR(20),
    sexo VARCHAR(20),
    correo_electronico VARCHAR(120),
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT fk_persona_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_persona_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE persona_tipo_persona (
    persona_tipo_persona_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    persona_id BIGINT NOT NULL,
    tipo_persona_id BIGINT NOT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT uk_persona_tipo UNIQUE (persona_id, tipo_persona_id),
    CONSTRAINT fk_ptp_persona
        FOREIGN KEY (persona_id) REFERENCES persona(persona_id),
    CONSTRAINT fk_ptp_tipo_persona
        FOREIGN KEY (tipo_persona_id) REFERENCES tipo_persona(tipo_persona_id),
    CONSTRAINT fk_ptp_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_ptp_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE rol (
    rol_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    rol_descripcion VARCHAR(60) NOT NULL UNIQUE,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT fk_rol_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_rol_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE usuario (
    usuario_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL UNIQUE,
    clave VARCHAR(120) NULL,
    persona_id BIGINT NOT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT fk_usuario_persona
        FOREIGN KEY (persona_id) REFERENCES persona(persona_id),
    CONSTRAINT fk_usuario_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_usuario_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE usuario_rol (
    usuario_rol_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    rol_id BIGINT NOT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT uk_usuario_rol UNIQUE (usuario_id, rol_id),
    CONSTRAINT fk_usuario_rol_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_usuario_rol_rol
        FOREIGN KEY (rol_id) REFERENCES rol(rol_id),
    CONSTRAINT fk_usuario_rol_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_usuario_rol_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE modulo (
    modulo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    modulo_descripcion VARCHAR(80) NOT NULL,
    modulo_id_padre BIGINT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT fk_modulo_padre
        FOREIGN KEY (modulo_id_padre) REFERENCES modulo(modulo_id),
    CONSTRAINT fk_modulo_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_modulo_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE permiso (
    permiso_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    rol_id BIGINT NOT NULL,
    modulo_id BIGINT NOT NULL,
    puede_ver BOOLEAN NOT NULL DEFAULT TRUE,
    puede_crear BOOLEAN NOT NULL DEFAULT FALSE,
    puede_editar BOOLEAN NOT NULL DEFAULT FALSE,
    puede_eliminar BOOLEAN NOT NULL DEFAULT FALSE,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT uk_permiso UNIQUE (rol_id, modulo_id),
    CONSTRAINT fk_permiso_rol
        FOREIGN KEY (rol_id) REFERENCES rol(rol_id),
    CONSTRAINT fk_permiso_modulo
        FOREIGN KEY (modulo_id) REFERENCES modulo(modulo_id),
    CONSTRAINT fk_permiso_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_permiso_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE canal_reclamo (
    canal_reclamo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    canal_descripcion VARCHAR(80) NOT NULL UNIQUE,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_canal_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_canal_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE categoria_reclamo (
    categoria_reclamo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    categoria_descripcion VARCHAR(100) NOT NULL UNIQUE,
    puntos_base INT NOT NULL DEFAULT 0,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_categoria_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_categoria_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE prioridad (
    prioridad_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    prioridad_descripcion VARCHAR(40) NOT NULL UNIQUE,
    puntaje_minimo INT NOT NULL,
    puntaje_maximo INT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_prioridad_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_prioridad_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE sla (
    sla_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sla_descripcion VARCHAR(60) NOT NULL UNIQUE,
    horas_limite INT NOT NULL,
    prioridad_id BIGINT NOT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sla_prioridad
        FOREIGN KEY (prioridad_id) REFERENCES prioridad(prioridad_id),
    CONSTRAINT fk_sla_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_sla_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE estado_reclamo (
    estado_reclamo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    estado_reclamo_descripcion VARCHAR(60) NOT NULL UNIQUE,
    es_estado_final BOOLEAN NOT NULL DEFAULT FALSE,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_estado_reclamo_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_estado_reclamo_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE condicion_prioridad (
    condicion_prioridad_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    condicion_descripcion VARCHAR(150) NOT NULL,
    puntos INT NOT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_condicion_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_condicion_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE reclamo (
    reclamo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(30) NOT NULL UNIQUE,
    cliente_persona_id BIGINT NOT NULL,
    canal_reclamo_id BIGINT NOT NULL,
    categoria_reclamo_id BIGINT NOT NULL,
    descripcion TEXT NOT NULL,
    monto_reclamo DECIMAL(10,2) NULL,
    indisponibilidad_digital BOOLEAN NOT NULL DEFAULT FALSE,
    puntaje INT NOT NULL DEFAULT 0,
    prioridad_id BIGINT NOT NULL,
    sla_id BIGINT NOT NULL,
    estado_reclamo_id BIGINT NOT NULL,
    analista_usuario_id BIGINT NULL,
    fecha_reclamo DATETIME NOT NULL,
    fecha_limite DATETIME NOT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    usu_id_creacion BIGINT NOT NULL,
    usu_id_modificacion BIGINT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT fk_reclamo_cliente
        FOREIGN KEY (cliente_persona_id) REFERENCES persona(persona_id),
    CONSTRAINT fk_reclamo_canal
        FOREIGN KEY (canal_reclamo_id) REFERENCES canal_reclamo(canal_reclamo_id),
    CONSTRAINT fk_reclamo_categoria
        FOREIGN KEY (categoria_reclamo_id) REFERENCES categoria_reclamo(categoria_reclamo_id),
    CONSTRAINT fk_reclamo_prioridad
        FOREIGN KEY (prioridad_id) REFERENCES prioridad(prioridad_id),
    CONSTRAINT fk_reclamo_sla
        FOREIGN KEY (sla_id) REFERENCES sla(sla_id),
    CONSTRAINT fk_reclamo_estado_reclamo
        FOREIGN KEY (estado_reclamo_id) REFERENCES estado_reclamo(estado_reclamo_id),
    CONSTRAINT fk_reclamo_analista
        FOREIGN KEY (analista_usuario_id) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_reclamo_estado
        FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_reclamo_empresa
        FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id),
    CONSTRAINT fk_reclamo_usuario_creacion
        FOREIGN KEY (usu_id_creacion) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_reclamo_usuario_modificacion
        FOREIGN KEY (usu_id_modificacion) REFERENCES usuario(usuario_id)
) ENGINE=InnoDB;

CREATE TABLE reclamo_historial (
    reclamo_historial_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    reclamo_id BIGINT NOT NULL,
    usuario_actor_id BIGINT NOT NULL,
    tipo_evento VARCHAR(60) NOT NULL,
    estado_anterior_id BIGINT NULL,
    estado_nuevo_id BIGINT NULL,
    analista_anterior_id BIGINT NULL,
    analista_nuevo_id BIGINT NULL,
    observacion VARCHAR(500) NOT NULL,
    fecha_evento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_historial_reclamo
        FOREIGN KEY (reclamo_id) REFERENCES reclamo(reclamo_id),
    CONSTRAINT fk_historial_usuario_actor
        FOREIGN KEY (usuario_actor_id) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_historial_estado_anterior
        FOREIGN KEY (estado_anterior_id) REFERENCES estado_reclamo(estado_reclamo_id),
    CONSTRAINT fk_historial_estado_nuevo
        FOREIGN KEY (estado_nuevo_id) REFERENCES estado_reclamo(estado_reclamo_id),
    CONSTRAINT fk_historial_analista_anterior
        FOREIGN KEY (analista_anterior_id) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_historial_analista_nuevo
        FOREIGN KEY (analista_nuevo_id) REFERENCES usuario(usuario_id)
) ENGINE=InnoDB;

CREATE INDEX idx_reclamo_codigo ON reclamo(codigo);
CREATE INDEX idx_reclamo_estado ON reclamo(estado_reclamo_id);
CREATE INDEX idx_reclamo_prioridad ON reclamo(prioridad_id);
CREATE INDEX idx_reclamo_categoria ON reclamo(categoria_reclamo_id);
CREATE INDEX idx_reclamo_canal ON reclamo(canal_reclamo_id);
CREATE INDEX idx_reclamo_analista ON reclamo(analista_usuario_id);
CREATE INDEX idx_reclamo_fecha_limite ON reclamo(fecha_limite);
CREATE INDEX idx_historial_reclamo ON reclamo_historial(reclamo_id, fecha_evento);

-- =========================================================
-- DATOS BASE
-- =========================================================

INSERT INTO estado (estado_id, estado_descripcion) VALUES
(1, 'Activo'),
(2, 'Inactivo');

INSERT INTO empresa (
    empresa_id, ruc, nombre, razon_social, direccion, telefono, correo_electronico, estado_id
) VALUES (
    1, '0999999999001', 'Banco Horizonte', 'Banco Horizonte S.A.',
    'Av. Simulacro 100 y Fintech', '042000000', 'contacto@bancohorizonte.test', 1
);

INSERT INTO tipo_persona (tipo_persona_id, tipo_persona_descripcion, estado_id, empresa_id) VALUES
(1, 'Cliente', 1, 1),
(2, 'Operador', 1, 1),
(3, 'Analista', 1, 1),
(4, 'Supervisor', 1, 1);

INSERT INTO persona (
    persona_id, nombre1, nombre2, apellido1, apellido2, identificacion,
    direccion, telefono, sexo, correo_electronico, estado_id, empresa_id
) VALUES
(1, 'Miguel', NULL, 'Galarza', NULL, 'FIC-0001', 'Guayaquil', '0990000001', 'Masculino', 'mgalarza@bancohorizonte.test', 1, 1),
(2, 'Carla', NULL, 'Loor', NULL, 'FIC-0002', 'Guayaquil', '0990000002', 'Femenino', 'cloor@bancohorizonte.test', 1, 1),
(3, 'Jorge', NULL, 'Ocana', NULL, 'FIC-0003', 'Daule', '0990000003', 'Masculino', 'jocana@bancohorizonte.test', 1, 1),
(4, 'Bianca', NULL, 'Bajana', NULL, 'FIC-0004', 'Samborondon', '0990000004', 'Femenino', 'bajana@bancohorizonte.test', 1, 1),
(101, 'Ana', 'Maria', 'Vera', 'Lopez', 'CLI-0101', 'Guayaquil', '0981000101', 'Femenino', 'ana.vera@example.test', 1, 1),
(102, 'Carlos', NULL, 'Mendoza', 'Ruiz', 'CLI-0102', 'Guayaquil', '0981000102', 'Masculino', 'carlos.mendoza@example.test', 1, 1),
(103, 'Daniela', NULL, 'Salazar', 'Mora', 'CLI-0103', 'Duran', '0981000103', 'Femenino', 'daniela.salazar@example.test', 1, 1),
(104, 'Luis', 'Alberto', 'Paredes', NULL, 'CLI-0104', 'Milagro', '0981000104', 'Masculino', 'luis.paredes@example.test', 1, 1),
(105, 'Mariana', NULL, 'Castillo', 'Vera', 'CLI-0105', 'Guayaquil', '0981000105', 'Femenino', 'mariana.castillo@example.test', 1, 1),
(106, 'Pedro', NULL, 'Andrade', 'Cruz', 'CLI-0106', 'Daule', '0981000106', 'Masculino', 'pedro.andrade@example.test', 1, 1),
(107, 'Sofia', 'Isabel', 'Romero', 'Paz', 'CLI-0107', 'Samborondon', '0981000107', 'Femenino', 'sofia.romero@example.test', 1, 1),
(108, 'Andres', NULL, 'Cevallos', 'Naranjo', 'CLI-0108', 'Guayaquil', '0981000108', 'Masculino', 'andres.cevallos@example.test', 1, 1),
(109, 'Valeria', NULL, 'Molina', NULL, 'CLI-0109', 'Duran', '0981000109', 'Femenino', 'valeria.molina@example.test', 1, 1),
(110, 'Fernando', NULL, 'Reyes', 'Solano', 'CLI-0110', 'Guayaquil', '0981000110', 'Masculino', 'fernando.reyes@example.test', 1, 1);

INSERT INTO persona_tipo_persona (persona_id, tipo_persona_id, estado_id, empresa_id) VALUES
(1, 4, 1, 1),
(2, 3, 1, 1),
(3, 3, 1, 1),
(4, 2, 1, 1),
(101, 1, 1, 1),
(102, 1, 1, 1),
(103, 1, 1, 1),
(104, 1, 1, 1),
(105, 1, 1, 1),
(106, 1, 1, 1),
(107, 1, 1, 1),
(108, 1, 1, 1),
(109, 1, 1, 1),
(110, 1, 1, 1);

INSERT INTO rol (rol_id, rol_descripcion, estado_id, empresa_id) VALUES
(1, 'Administrador', 1, 1),
(2, 'Supervisor', 1, 1),
(3, 'Analista', 1, 1),
(4, 'Operador', 1, 1);

INSERT INTO usuario (
    usuario_id, nombre, clave, persona_id, estado_id, empresa_id
) VALUES
(1, 'mgalarza', NULL, 1, 1, 1),
(2, 'cloor', NULL, 2, 1, 1),
(3, 'jocana', NULL, 3, 1, 1),
(4, 'bajana', NULL, 4, 1, 1);

INSERT INTO usuario_rol (usuario_id, rol_id, estado_id, empresa_id) VALUES
(1, 1, 1, 1),
(1, 2, 1, 1),
(2, 3, 1, 1),
(3, 3, 1, 1),
(4, 4, 1, 1);

INSERT INTO modulo (modulo_id, modulo_descripcion, modulo_id_padre, estado_id, empresa_id) VALUES
(1, 'Reclamos', NULL, 1, 1),
(2, 'Catalogos', NULL, 1, 1),
(3, 'Seguridad', NULL, 1, 1),
(4, 'Tablero operativo', 1, 1, 1),
(5, 'Registro de reclamos', 1, 1, 1),
(6, 'Gestion de estados', 1, 1, 1),
(7, 'Usuarios y roles', 3, 1, 1);

INSERT INTO permiso (
    rol_id, modulo_id, puede_ver, puede_crear, puede_editar, puede_eliminar, estado_id, empresa_id
) VALUES
(1, 1, TRUE, TRUE, TRUE, TRUE, 1, 1),
(1, 2, TRUE, TRUE, TRUE, TRUE, 1, 1),
(1, 3, TRUE, TRUE, TRUE, TRUE, 1, 1),
(2, 1, TRUE, FALSE, TRUE, FALSE, 1, 1),
(2, 4, TRUE, FALSE, FALSE, FALSE, 1, 1),
(2, 6, TRUE, FALSE, TRUE, FALSE, 1, 1),
(3, 1, TRUE, FALSE, TRUE, FALSE, 1, 1),
(3, 6, TRUE, FALSE, TRUE, FALSE, 1, 1),
(4, 5, TRUE, TRUE, FALSE, FALSE, 1, 1);

INSERT INTO canal_reclamo (canal_reclamo_id, canal_descripcion, estado_id, empresa_id) VALUES
(1, 'Aplicacion movil', 1, 1),
(2, 'Banca web', 1, 1),
(3, 'Agencia', 1, 1),
(4, 'Llamada telefonica', 1, 1),
(5, 'Correo electronico', 1, 1);

INSERT INTO categoria_reclamo (
    categoria_reclamo_id, categoria_descripcion, puntos_base, estado_id, empresa_id
) VALUES
(1, 'Transaccion no reconocida', 4, 1, 1),
(2, 'Compra no reconocida', 4, 1, 1),
(3, 'Transferencia no acreditada', 3, 1, 1),
(4, 'Acceso o canal bloqueado', 3, 1, 1),
(5, 'Cobro indebido', 0, 1, 1),
(6, 'Atencion al cliente', 0, 1, 1),
(7, 'Actualizacion de datos', 0, 1, 1);

INSERT INTO prioridad (
    prioridad_id, prioridad_descripcion, puntaje_minimo, puntaje_maximo, estado_id, empresa_id
) VALUES
(1, 'Baja', 0, 2, 1, 1),
(2, 'Media', 3, 4, 1, 1),
(3, 'Alta', 5, 6, 1, 1),
(4, 'Critica', 7, NULL, 1, 1);

INSERT INTO sla (
    sla_id, sla_descripcion, horas_limite, prioridad_id, estado_id, empresa_id
) VALUES
(1, '24 horas', 24, 1, 1, 1),
(2, '12 horas', 12, 2, 1, 1),
(3, '6 horas', 6, 3, 1, 1),
(4, '2 horas', 2, 4, 1, 1);

INSERT INTO estado_reclamo (
    estado_reclamo_id, estado_reclamo_descripcion, es_estado_final, estado_id, empresa_id
) VALUES
(1, 'Nuevo', FALSE, 1, 1),
(2, 'En analisis', FALSE, 1, 1),
(3, 'Resuelto', TRUE, 1, 1),
(4, 'Rechazado', TRUE, 1, 1);

INSERT INTO condicion_prioridad (
    condicion_prioridad_id, condicion_descripcion, puntos, estado_id, empresa_id
) VALUES
(1, 'Categoria transaccion o compra no reconocida', 4, 1, 1),
(2, 'Categoria transferencia no acreditada o acceso/canal bloqueado', 3, 1, 1),
(3, 'Monto afectado igual o superior a 500 USD', 3, 1, 1),
(4, 'Canal digital completamente indisponible para el cliente', 2, 1, 1),
(5, 'Reclamo registrado hace mas de 24 horas y continua abierto', 2, 1, 1);

-- =========================================================
-- RECLAMOS DE DEMOSTRACION
-- Puntaje calculado segun el documento:
-- categoria + monto >= 500 + indisponibilidad digital + antiguedad > 24h.
-- =========================================================

INSERT INTO reclamo (
    reclamo_id, codigo, cliente_persona_id, canal_reclamo_id, categoria_reclamo_id,
    descripcion, monto_reclamo, indisponibilidad_digital, puntaje,
    prioridad_id, sla_id, estado_reclamo_id, analista_usuario_id,
    fecha_reclamo, fecha_limite, estado_id, empresa_id,
    usu_id_creacion, usu_id_modificacion, fecha_creacion, fecha_modificacion
) VALUES
(1, 'FR-2026-0001', 101, 1, 1,
 'Cliente reporta transaccion no reconocida por consumo en comercio digital.',
 780.00, FALSE, 7, 4, 4, 3, 2,
 '2026-07-29 08:30:00', '2026-07-29 10:30:00', 1, 1, 4, 2,
 '2026-07-29 08:30:00', '2026-07-29 10:15:00'),
(2, 'FR-2026-0002', 102, 2, 3,
 'Transferencia realizada desde banca web no se acredita en cuenta destino.',
 250.00, FALSE, 3, 2, 2, 2, 3,
 '2026-07-29 09:05:00', '2026-07-29 21:05:00', 1, 1, 4, 3,
 '2026-07-29 09:05:00', '2026-07-29 09:40:00'),
(3, 'FR-2026-0003', 103, 1, 4,
 'Cliente no puede acceder a la aplicacion movil y necesita realizar pagos.',
 0.00, TRUE, 5, 3, 3, 1, NULL,
 '2026-07-29 10:10:00', '2026-07-29 16:10:00', 1, 1, 4, NULL,
 '2026-07-29 10:10:00', NULL),
(4, 'FR-2026-0004', 104, 3, 5,
 'Cliente solicita revision por cobro de mantenimiento duplicado.',
 18.50, FALSE, 0, 1, 1, 4, 2,
 '2026-07-28 16:20:00', '2026-07-29 16:20:00', 1, 1, 4, 2,
 '2026-07-28 16:20:00', '2026-07-29 11:00:00'),
(5, 'FR-2026-0005', 105, 4, 2,
 'Compra no reconocida con tarjeta de debito en establecimiento local.',
 120.00, FALSE, 4, 2, 2, 2, 2,
 '2026-07-29 11:45:00', '2026-07-29 23:45:00', 1, 1, 4, 2,
 '2026-07-29 11:45:00', '2026-07-29 12:10:00'),
(6, 'FR-2026-0006', 106, 5, 6,
 'Cliente reporta mala atencion y solicita seguimiento de su caso.',
 0.00, FALSE, 0, 1, 1, 1, NULL,
 '2026-07-29 12:05:00', '2026-07-30 12:05:00', 1, 1, 4, NULL,
 '2026-07-29 12:05:00', NULL),
(7, 'FR-2026-0007', 107, 1, 3,
 'Transferencia no acreditada; cliente indica que el canal movil estuvo intermitente.',
 640.00, TRUE, 8, 4, 4, 2, 3,
 '2026-07-29 13:15:00', '2026-07-29 15:15:00', 1, 1, 4, 3,
 '2026-07-29 13:15:00', '2026-07-29 13:35:00'),
(8, 'FR-2026-0008', 108, 2, 7,
 'Cliente solicita corregir telefono y correo registrados.',
 0.00, FALSE, 0, 1, 1, 3, 2,
 '2026-07-28 09:00:00', '2026-07-29 09:00:00', 1, 1, 4, 2,
 '2026-07-28 09:00:00', '2026-07-28 10:00:00'),
(9, 'FR-2026-0009', 109, 2, 1,
 'Transaccion no reconocida y cliente no puede bloquear tarjeta desde banca web.',
 980.00, TRUE, 9, 4, 4, 1, NULL,
 '2026-07-29 14:00:00', '2026-07-29 16:00:00', 1, 1, 4, NULL,
 '2026-07-29 14:00:00', NULL),
(10, 'FR-2026-0010', 110, 3, 5,
 'Cobro de comision que el cliente considera incorrecto.',
 35.00, FALSE, 0, 1, 1, 2, 3,
 '2026-07-28 18:30:00', '2026-07-29 18:30:00', 1, 1, 4, 3,
 '2026-07-28 18:30:00', '2026-07-29 08:45:00');

INSERT INTO reclamo_historial (
    reclamo_id, usuario_actor_id, tipo_evento, estado_anterior_id, estado_nuevo_id,
    analista_anterior_id, analista_nuevo_id, observacion, fecha_evento
) VALUES
(1, 4, 'CREACION', NULL, 1, NULL, NULL, 'Reclamo registrado por operador.', '2026-07-29 08:30:00'),
(1, 1, 'ASIGNACION', 1, 1, NULL, 2, 'Supervisor asigna el caso a analista.', '2026-07-29 08:45:00'),
(1, 2, 'CAMBIO_ESTADO', 1, 2, 2, 2, 'Analista inicia revision del movimiento.', '2026-07-29 09:00:00'),
(1, 2, 'CAMBIO_ESTADO', 2, 3, 2, 2, 'Se reversa el consumo luego de validar evidencia.', '2026-07-29 10:15:00'),
(2, 4, 'CREACION', NULL, 1, NULL, NULL, 'Reclamo registrado por operador.', '2026-07-29 09:05:00'),
(2, 1, 'ASIGNACION', 1, 1, NULL, 3, 'Supervisor asigna caso a analista disponible.', '2026-07-29 09:25:00'),
(2, 3, 'CAMBIO_ESTADO', 1, 2, 3, 3, 'Analista valida trazabilidad de transferencia.', '2026-07-29 09:40:00'),
(3, 4, 'CREACION', NULL, 1, NULL, NULL, 'Reclamo registrado por bloqueo de canal digital.', '2026-07-29 10:10:00'),
(4, 4, 'CREACION', NULL, 1, NULL, NULL, 'Reclamo registrado en agencia.', '2026-07-28 16:20:00'),
(4, 1, 'ASIGNACION', 1, 1, NULL, 2, 'Supervisor asigna revision de cobro.', '2026-07-28 16:40:00'),
(4, 2, 'CAMBIO_ESTADO', 1, 4, 2, 2, 'No se evidencia cobro duplicado; se rechaza con soporte.', '2026-07-29 11:00:00'),
(5, 4, 'CREACION', NULL, 1, NULL, NULL, 'Compra no reconocida registrada por llamada.', '2026-07-29 11:45:00'),
(5, 1, 'ASIGNACION', 1, 1, NULL, 2, 'Supervisor asigna a analista.', '2026-07-29 12:00:00'),
(5, 2, 'CAMBIO_ESTADO', 1, 2, 2, 2, 'Analista solicita validacion de comercio.', '2026-07-29 12:10:00'),
(6, 4, 'CREACION', NULL, 1, NULL, NULL, 'Reclamo por atencion registrado desde correo.', '2026-07-29 12:05:00'),
(7, 4, 'CREACION', NULL, 1, NULL, NULL, 'Reclamo critico registrado desde aplicacion movil.', '2026-07-29 13:15:00'),
(7, 1, 'ASIGNACION', 1, 1, NULL, 3, 'Supervisor prioriza atencion inmediata.', '2026-07-29 13:25:00'),
(7, 3, 'CAMBIO_ESTADO', 1, 2, 3, 3, 'Analista toma el caso por criticidad.', '2026-07-29 13:35:00'),
(8, 4, 'CREACION', NULL, 1, NULL, NULL, 'Solicitud de actualizacion de datos.', '2026-07-28 09:00:00'),
(8, 1, 'ASIGNACION', 1, 1, NULL, 2, 'Supervisor asigna solicitud operativa.', '2026-07-28 09:10:00'),
(8, 2, 'CAMBIO_ESTADO', 1, 3, 2, 2, 'Datos actualizados correctamente.', '2026-07-28 10:00:00'),
(9, 4, 'CREACION', NULL, 1, NULL, NULL, 'Reclamo critico pendiente de asignacion.', '2026-07-29 14:00:00'),
(10, 4, 'CREACION', NULL, 1, NULL, NULL, 'Cobro de comision registrado en agencia.', '2026-07-28 18:30:00'),
(10, 1, 'ASIGNACION', 1, 1, NULL, 3, 'Supervisor asigna revision.', '2026-07-29 08:30:00'),
(10, 3, 'CAMBIO_ESTADO', 1, 2, 3, 3, 'Analista valida tarifario vigente.', '2026-07-29 08:45:00');

-- =========================================================
-- CONSULTAS UTILES PARA PROBAR EL MVP
-- =========================================================

-- Listado principal con datos legibles.
CREATE OR REPLACE VIEW vw_reclamos_resumen AS
SELECT
    r.reclamo_id,
    r.codigo,
    CONCAT(p.nombre1, ' ', p.apellido1) AS cliente,
    cr.canal_descripcion AS canal,
    cat.categoria_descripcion AS categoria,
    er.estado_reclamo_descripcion AS estado_reclamo,
    pr.prioridad_descripcion AS prioridad,
    r.puntaje,
    r.monto_reclamo,
    r.fecha_reclamo,
    r.fecha_limite,
    CASE
        WHEN er.es_estado_final = TRUE THEN 'Cerrado'
        WHEN NOW() > r.fecha_limite THEN 'Vencido'
        WHEN TIMESTAMPDIFF(MINUTE, r.fecha_reclamo, NOW()) >= (s.horas_limite * 60 * 0.75) THEN 'Proximo a vencer'
        ELSE 'Dentro del plazo'
    END AS estado_sla,
    COALESCE(u.nombre, 'Sin asignar') AS analista
FROM reclamo r
INNER JOIN persona p ON p.persona_id = r.cliente_persona_id
INNER JOIN canal_reclamo cr ON cr.canal_reclamo_id = r.canal_reclamo_id
INNER JOIN categoria_reclamo cat ON cat.categoria_reclamo_id = r.categoria_reclamo_id
INNER JOIN estado_reclamo er ON er.estado_reclamo_id = r.estado_reclamo_id
INNER JOIN prioridad pr ON pr.prioridad_id = r.prioridad_id
INNER JOIN sla s ON s.sla_id = r.sla_id
LEFT JOIN usuario u ON u.usuario_id = r.analista_usuario_id;

-- Indicadores del tablero.
CREATE OR REPLACE VIEW vw_tablero_operativo AS
SELECT
    COUNT(*) AS total_reclamos,
    SUM(CASE WHEN er.es_estado_final = FALSE THEN 1 ELSE 0 END) AS abiertos,
    SUM(CASE WHEN er.estado_reclamo_descripcion = 'Resuelto' THEN 1 ELSE 0 END) AS resueltos,
    SUM(CASE WHEN er.es_estado_final = FALSE AND NOW() > r.fecha_limite THEN 1 ELSE 0 END) AS vencidos,
    SUM(CASE
        WHEN er.es_estado_final = FALSE
         AND NOW() <= r.fecha_limite
         AND TIMESTAMPDIFF(MINUTE, r.fecha_reclamo, NOW()) >= (s.horas_limite * 60 * 0.75)
        THEN 1 ELSE 0
    END) AS proximos_a_vencer,
    SUM(CASE WHEN pr.prioridad_descripcion = 'Critica' THEN 1 ELSE 0 END) AS criticos
FROM reclamo r
INNER JOIN estado_reclamo er ON er.estado_reclamo_id = r.estado_reclamo_id
INNER JOIN prioridad pr ON pr.prioridad_id = r.prioridad_id
INNER JOIN sla s ON s.sla_id = r.sla_id;

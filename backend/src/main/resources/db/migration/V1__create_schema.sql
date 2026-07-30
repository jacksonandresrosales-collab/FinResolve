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
    CONSTRAINT fk_empresa_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id)
) ENGINE=InnoDB;

CREATE TABLE tipo_persona (
    tipo_persona_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tipo_persona_descripcion VARCHAR(60) NOT NULL UNIQUE,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT fk_tp_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_tp_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
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
    CONSTRAINT fk_per_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_per_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
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
    CONSTRAINT fk_ptp_persona FOREIGN KEY (persona_id) REFERENCES persona(persona_id),
    CONSTRAINT fk_ptp_tipo FOREIGN KEY (tipo_persona_id) REFERENCES tipo_persona(tipo_persona_id),
    CONSTRAINT fk_ptp_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_ptp_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE rol (
    rol_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    rol_descripcion VARCHAR(60) NOT NULL UNIQUE,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT fk_rol_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_rol_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
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
    CONSTRAINT fk_usr_persona FOREIGN KEY (persona_id) REFERENCES persona(persona_id),
    CONSTRAINT fk_usr_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_usr_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
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
    CONSTRAINT fk_ur_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_ur_rol FOREIGN KEY (rol_id) REFERENCES rol(rol_id),
    CONSTRAINT fk_ur_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_ur_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE modulo (
    modulo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    modulo_descripcion VARCHAR(80) NOT NULL,
    modulo_id_padre BIGINT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    CONSTRAINT fk_mod_padre FOREIGN KEY (modulo_id_padre) REFERENCES modulo(modulo_id),
    CONSTRAINT fk_mod_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_mod_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
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
    CONSTRAINT fk_perm_rol FOREIGN KEY (rol_id) REFERENCES rol(rol_id),
    CONSTRAINT fk_perm_mod FOREIGN KEY (modulo_id) REFERENCES modulo(modulo_id),
    CONSTRAINT fk_perm_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_perm_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE canal_reclamo (
    canal_reclamo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    canal_descripcion VARCHAR(80) NOT NULL UNIQUE,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_canal_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_canal_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE categoria_reclamo (
    categoria_reclamo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    categoria_descripcion VARCHAR(100) NOT NULL UNIQUE,
    puntos_base INT NOT NULL DEFAULT 0,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cat_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_cat_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE prioridad (
    prioridad_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    prioridad_descripcion VARCHAR(40) NOT NULL UNIQUE,
    puntaje_minimo INT NOT NULL,
    puntaje_maximo INT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pri_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_pri_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE sla (
    sla_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sla_descripcion VARCHAR(60) NOT NULL UNIQUE,
    horas_limite INT NOT NULL,
    prioridad_id BIGINT NOT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sla_prioridad FOREIGN KEY (prioridad_id) REFERENCES prioridad(prioridad_id),
    CONSTRAINT fk_sla_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_sla_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE estado_reclamo (
    estado_reclamo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    estado_reclamo_descripcion VARCHAR(60) NOT NULL UNIQUE,
    es_estado_final BOOLEAN NOT NULL DEFAULT FALSE,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_er_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_er_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
) ENGINE=InnoDB;

CREATE TABLE condicion_prioridad (
    condicion_prioridad_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    condicion_descripcion VARCHAR(150) NOT NULL,
    puntos INT NOT NULL,
    estado_id BIGINT NOT NULL,
    empresa_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cp_estado FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_cp_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id)
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
    CONSTRAINT fk_rec_cliente FOREIGN KEY (cliente_persona_id) REFERENCES persona(persona_id),
    CONSTRAINT fk_rec_canal FOREIGN KEY (canal_reclamo_id) REFERENCES canal_reclamo(canal_reclamo_id),
    CONSTRAINT fk_rec_categoria FOREIGN KEY (categoria_reclamo_id) REFERENCES categoria_reclamo(categoria_reclamo_id),
    CONSTRAINT fk_rec_prioridad FOREIGN KEY (prioridad_id) REFERENCES prioridad(prioridad_id),
    CONSTRAINT fk_rec_sla FOREIGN KEY (sla_id) REFERENCES sla(sla_id),
    CONSTRAINT fk_rec_estado FOREIGN KEY (estado_reclamo_id) REFERENCES estado_reclamo(estado_reclamo_id),
    CONSTRAINT fk_rec_analista FOREIGN KEY (analista_usuario_id) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_rec_estado_gral FOREIGN KEY (estado_id) REFERENCES estado(estado_id),
    CONSTRAINT fk_rec_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(empresa_id),
    CONSTRAINT fk_rec_usr_crea FOREIGN KEY (usu_id_creacion) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_rec_usr_mod FOREIGN KEY (usu_id_modificacion) REFERENCES usuario(usuario_id)
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
    CONSTRAINT fk_hist_rec FOREIGN KEY (reclamo_id) REFERENCES reclamo(reclamo_id),
    CONSTRAINT fk_hist_actor FOREIGN KEY (usuario_actor_id) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_hist_est_ant FOREIGN KEY (estado_anterior_id) REFERENCES estado_reclamo(estado_reclamo_id),
    CONSTRAINT fk_hist_est_new FOREIGN KEY (estado_nuevo_id) REFERENCES estado_reclamo(estado_reclamo_id),
    CONSTRAINT fk_hist_analista_ant FOREIGN KEY (analista_anterior_id) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_hist_analista_new FOREIGN KEY (analista_nuevo_id) REFERENCES usuario(usuario_id)
) ENGINE=InnoDB;

CREATE INDEX idx_reclamo_codigo ON reclamo(codigo);
CREATE INDEX idx_reclamo_estado ON reclamo(estado_reclamo_id);
CREATE INDEX idx_reclamo_prioridad ON reclamo(prioridad_id);
CREATE INDEX idx_reclamo_categoria ON reclamo(categoria_reclamo_id);
CREATE INDEX idx_reclamo_canal ON reclamo(canal_reclamo_id);
CREATE INDEX idx_reclamo_analista ON reclamo(analista_usuario_id);
CREATE INDEX idx_reclamo_fecha_limite ON reclamo(fecha_limite);
CREATE INDEX idx_historial_reclamo ON reclamo_historial(reclamo_id, fecha_evento);

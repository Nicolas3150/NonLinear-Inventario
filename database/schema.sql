-- Creacion de la base de datos
CREATE DATABASE IF NOT EXISTS inventario_db CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

USE inventario_db;

-- Tabla Rol (Para manejar los perfiles: admin, operador, etc.)
CREATE TABLE
    rol (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL UNIQUE, -- Ej: 'administrador', 'operador'
        descripcion TEXT
    );

-- Tabla Usuario
CREATE TABLE
    usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL, -- Para almacenar la contraseña hasheada (Bcrypt)
        rol_id INT NOT NULL,
        activo BOOLEAN DEFAULT TRUE,
        CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES rol (id) ON UPDATE CASCADE ON DELETE RESTRICT
    );

-- Tabla Categoria
CREATE TABLE
    categoria (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        descripcion TEXT
    );

-- Tabla Producto
-- Incluye regla de negocio para que stock nunca sea negativo
-- Incluye ademas, el stock minimo para alertar cuando el stock de un producto es bajo
CREATE TABLE
    producto (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(150) NOT NULL,
        categoria_id INT NOT NULL,
        precio_unitario DECIMAL(10, 2) NOT NULL,
        stock_actual INT NOT NULL DEFAULT 0,
        stock_minimo INT NOT NULL DEFAULT 5, -- Umbral para alertas de stock bajo
        CONSTRAINT fk_producto_categoria FOREIGN KEY (categoria_id) REFERENCES categoria (id) ON UPDATE CASCADE ON DELETE RESTRICT,
        CONSTRAINT chk_stock_positivo CHECK (stock_actual >= 0),
        CONSTRAINT chk_precio_positivo CHECK (precio_unitario > 0)
    );

-- Tabla Movimiento (Registra el usuario que hizo la entrada/salida)
CREATE TABLE
    movimiento (
        id INT AUTO_INCREMENT PRIMARY KEY,
        producto_id INT NOT NULL,
        usuario_id INT NOT NULL, -- Relacion directa con el usuario logueado
        tipo ENUM ('ENTRADA', 'SALIDA') NOT NULL,
        cantidad INT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        motivo VARCHAR(255),
        CONSTRAINT fk_movimiento_producto FOREIGN KEY (producto_id) REFERENCES producto (id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_movimiento_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON UPDATE CASCADE ON DELETE RESTRICT,
        CONSTRAINT chk_cantidad_positiva CHECK (cantidad > 0)
    );

-- Tabla de Auditoria (Para registrar cambios de nombre o precio)
CREATE TABLE
    auditoria_producto (
        id INT AUTO_INCREMENT PRIMARY KEY,
        producto_id INT NOT NULL,
        usuario_id INT NOT NULL, -- Quien hizo la modificación
        campo_modificado VARCHAR(50) NOT NULL,
        valor_anterior VARCHAR(255),
        valor_nuevo VARCHAR(255),
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_auditoria_producto FOREIGN KEY (producto_id) REFERENCES producto (id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_auditoria_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON UPDATE CASCADE ON DELETE RESTRICT
    );
USE inventario_db;

-- 1. Insertar Roles iniciales
INSERT INTO rol (id, nombre, descripcion) VALUES
(1, 'administrador', 'Acceso total al sistema, gestión de usuarios y configuraciones'),
(2, 'operador', 'Gestión de inventario, registro de entradas y salidas');

-- 2. Insertar Usuarios de prueba (contraseñas hasheadas de ejemplo)
INSERT INTO usuario (id, nombre, username, password_hash, rol_id, activo) VALUES
(1, 'Nicolás Administrador', 'admin', '$2b$12$E...hashdemo1', 1, TRUE),
(2, 'Juan Operador', 'operador', '$2b$12$E...hashdemo2', 2, TRUE);

-- 3. Insertar Categorías
INSERT INTO categoria (id, nombre, descripcion) VALUES
(1, 'Electrónica', 'Componentes, dispositivos y accesorios electrónicos'),
(2, 'Ropa y Calzado', 'Indumentaria y calzado deportivo o casual'),
(3, 'Herramientas', 'Herramientas de mano y equipamiento de taller');

-- 4. Insertar Productos (con stock inicial y stock mínimo para alertas)
INSERT INTO producto (id, nombre, categoria_id, precio_unitario, stock_actual, stock_minimo) VALUES
(1, 'Microcontrolador ESP32-C3', 1, 4500.50, 25, 5),
(2, 'Cable USB-C mallado 1m', 1, 1200.00, 3, 10), -- Este queda bajo stock para probar la alerta
(3, 'Zapatillas de running Venzo', 2, 45000.00, 12, 4),
(4, 'Remera deportiva 3 bolsillos', 2, 18500.00, 20, 5),
(5, 'Destornillador aislado Phillips', 3, 3500.00, 8, 3);

-- 5. Insertar un Movimiento de ejemplo
INSERT INTO movimiento (producto_id, usuario_id, tipo, cantidad, motivo) VALUES
(1, 1, 'ENTRADA', 25, 'Stock inicial de compra a proveedor');
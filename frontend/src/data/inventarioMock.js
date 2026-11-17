/* src/data/inventarioMock.js */

export const CATEGORIAS_MOCK = [
  "Herramientas",
  "Ferretería",
  "Seguridad",
  "Electricidad",
];

export const PRODUCTOS_MOCK = [
  {
    id: 1,
    nombre: "Taladro percutor 18V",
    categoria: { nombre: "Herramientas" },
    precio_unitario: 184.9,
    stock_actual: 24,
    stock_minimo: 8,
  },
  {
    id: 2,
    nombre: "Tornillo hexagonal M8",
    categoria: { nombre: "Ferretería" },
    precio_unitario: 0.45,
    stock_actual: 86,
    stock_minimo: 100, // Stock bajo
  },
  {
    id: 3,
    nombre: "Guantes de nitrilo",
    categoria: { nombre: "Seguridad" },
    precio_unitario: 12.8,
    stock_actual: 7,
    stock_minimo: 20, // Stock bajo
  },
  {
    id: 4,
    nombre: "Cable eléctrico 2.5 mm",
    categoria: { nombre: "Electricidad" },
    precio_unitario: 2.35,
    stock_actual: 145,
    stock_minimo: 40,
  },
  {
    id: 5,
    nombre: "Lámpara LED industrial",
    categoria: { nombre: "Electricidad" },
    precio_unitario: 68.0,
    stock_actual: 18,
    stock_minimo: 10,
  },
  {
    id: 6,
    nombre: "Casco de seguridad",
    categoria: { nombre: "Seguridad" },
    precio_unitario: 23.5,
    stock_actual: 4,
    stock_minimo: 12, // Stock bajo
  },
  {
    id: 7,
    nombre: 'Llave ajustable 10"',
    categoria: { nombre: "Herramientas" },
    precio_unitario: 29.9,
    stock_actual: 32,
    stock_minimo: 10,
  },
  {
    id: 8,
    nombre: "Cinta de teflón",
    categoria: { nombre: "Ferretería" },
    precio_unitario: 1.75,
    stock_actual: 58,
    stock_minimo: 30,
  },
];

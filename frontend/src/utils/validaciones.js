export function validarMovimiento({ cantidad, stockDisponible, tipo }) {
  const errores = {};

  const numCantidad = Number(cantidad);

  if (!cantidad || isNaN(numCantidad) || numCantidad <= 0) {
    errores.cantidad = "La cantidad debe ser mayor a 0.";
  } else if (tipo === "salida" && numCantidad > stockDisponible) {
    errores.cantidad = `Stock insuficiente. Disponibles: ${stockDisponible} uds.`;
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores,
  };
}

/* src/components/ModalMovimiento.jsx */
import { useState } from "react";
import { X, Search, AlertCircle } from "lucide-react";
import { PRODUCTOS_MOCK } from "../../data/inventarioMock";
import { validarMovimiento } from "../../utils/validaciones"; // <-- Importamos la lógica separada
import "./ModalMovimiento.css";

export function ModalMovimiento({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [tipo, setTipo] = useState("entrada");
  const [productoId, setProductoId] = useState(PRODUCTOS_MOCK[0].id);
  const [cantidad, setCantidad] = useState(1);
  const [motivo, setMotivo] = useState("");
  const [errorVisual, setErrorVisual] = useState(""); // <-- Estado para el mensaje de error

  const productoSeleccionado =
    PRODUCTOS_MOCK.find((p) => p.id === Number(productoId)) ||
    PRODUCTOS_MOCK[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validamos usando la función externa (separación de responsabilidades)
    const { esValido, errores } = validarMovimiento({
      cantidad,
      stockDisponible: productoSeleccionado.stock_actual,
      tipo,
    });

    if (!esValido) {
      setErrorVisual(errores.cantidad);
      return;
    }

    setErrorVisual("");
    console.log("Movimiento validado y registrado con éxito:", {
      tipo,
      productoId: productoSeleccionado.id,
      nombre: productoSeleccionado.nombre,
      cantidad: Number(cantidad),
      motivo,
      registradoPor: "Ana Martínez",
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Registrar movimiento</h2>
            <p className="modal-subtitle">
              Actualiza las existencias del inventario.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Cerrar">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Selección de Producto */}
            <div className="form-group">
              <label className="form-label">Producto</label>
              <select
                className="modal-select"
                value={productoId}
                onChange={(e) => {
                  setProductoId(e.target.value);
                  setErrorVisual(""); // Limpiar error al cambiar de producto
                }}
              >
                {PRODUCTOS_MOCK.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.nombre} — {prod.stock_actual} uds.
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de Movimiento */}
            <div className="form-group">
              <label className="form-label">Tipo de movimiento</label>
              <div className="tipo-movimiento-selector">
                <button
                  type="button"
                  className={`btn-tipo entrada ${tipo === "entrada" ? "active" : ""}`}
                  onClick={() => {
                    setTipo("entrada");
                    setErrorVisual("");
                  }}
                >
                  Entrada
                </button>
                <button
                  type="button"
                  className={`btn-tipo salida ${tipo === "salida" ? "active" : ""}`}
                  onClick={() => {
                    setTipo("salida");
                    setErrorVisual("");
                  }}
                >
                  Salida
                </button>
              </div>
            </div>

            {/* Cantidad */}
            <div className="form-group">
              <label className="form-label">Cantidad</label>
              <input
                type="number"
                min="1"
                className={`modal-input ${errorVisual ? "input-error" : ""}`}
                value={cantidad}
                onChange={(e) => {
                  setCantidad(e.target.value);
                  setErrorVisual("");
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.25rem",
                }}
              >
                <span className="input-helper">
                  Stock disponible: {productoSeleccionado.stock_actual} unidades
                </span>
                {errorVisual && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-danger)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.2rem",
                      fontWeight: "600",
                    }}
                  >
                    <AlertCircle size={12} /> {errorVisual}
                  </span>
                )}
              </div>
            </div>

            {/* Motivo */}
            <div className="form-group">
              <label className="form-label">
                Motivo <span className="form-label-sub">(opcional)</span>
              </label>
              <textarea
                className="modal-textarea"
                placeholder="Ej. Compra a proveedor o merma por rotura"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>

            {/* Tarjeta de usuario activo */}
            <div className="user-badge-card">
              <div className="user-badge-info">
                <div className="user-badge-avatar">AM</div>
                <div>
                  <div className="user-badge-name">Ana Martínez</div>
                  <div className="user-badge-role">Administradora</div>
                </div>
              </div>
              <span className="session-active-tag">SESIÓN ACTIVA</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secundario" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary-action">
              Confirmar movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

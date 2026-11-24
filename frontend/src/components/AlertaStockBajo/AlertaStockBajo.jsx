import { AlertTriangle, Box, Clock3, X } from "lucide-react";
import { PRODUCTOS_MOCK } from "../../data/inventarioMock";
import "./AlertaStockBajo.css";

export function AlertaStockBajo({ productos = PRODUCTOS_MOCK }) {
  const productosCriticos = productos.filter(
    (prod) => prod.stock_actual <= prod.stock_minimo,
  );

  return (
    <article className="alerta-card">
      <div className="alerta-header">
        <div className="alerta-title-group">
          <div className="alerta-icon-box">
            <AlertTriangle size={19} />
          </div>
          <div>
            <h3 className="alerta-title">Stock bajo</h3>
            <p className="alerta-subtitle">
              {productosCriticos.length === 0
                ? "Todo en orden"
                : `${productosCriticos.length} ${
                    productosCriticos.length === 1 ? "producto requiere" : "productos requieren"
                  } atención`}
            </p>
          </div>
        </div>
      </div>

      {productosCriticos.length === 0 ? (
        <div className="alerta-ok">
          Todos los productos superan el stock mínimo.
        </div>
      ) : (
        <div className="alerta-list">
          {productosCriticos.map((prod) => (
            <div key={prod.id} className="alerta-item">
              <div className="alerta-product-icon">
                <Box size={19} />
              </div>
              <div className="alerta-item-info">
                <span className="alerta-item-nombre">{prod.nombre}</span>
                <span className="alerta-item-stock">
                  <strong className="alerta-stock-actual">
                    {prod.stock_actual} uds.
                  </strong>
                  <span className="alerta-stock-min">
                    · Mínimo {prod.stock_minimo}
                  </span>
                </span>
              </div>
              <div className="alerta-item-actions" aria-hidden="true">
                <Clock3 size={17} />
                <X size={18} />
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

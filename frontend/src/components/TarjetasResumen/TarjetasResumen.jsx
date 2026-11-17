/* src/components/TarjetasResumen.jsx */
import { Box, TrendingUp, AlertTriangle, BarChart2 } from "lucide-react";
import { PRODUCTOS_MOCK, CATEGORIAS_MOCK } from "../data/inventarioMock";
import "./TarjetasResumen.css";

export function TarjetasResumen({ productos = PRODUCTOS_MOCK }) {
  const totalProductos = productos.length;

  const unidadesTotales = productos.reduce(
    (acc, prod) => acc + prod.stock_actual,
    0,
  );

  const cantidadStockBajo = productos.filter(
    (prod) => prod.stock_actual <= prod.stock_minimo,
  ).length;

  const valorInventario = productos.reduce(
    (acc, prod) => acc + prod.stock_actual * prod.precio_unitario,
    0,
  );

  const tarjetas = [
    {
      id: "total",
      titulo: "Total de productos",
      valor: totalProductos,
      detalle: `${CATEGORIAS_MOCK.length} categorías activas`,
      esAlerta: false,
      varianteIcono: "azul",
      icono: <Box size={20} />,
    },
    {
      id: "unidades",
      titulo: "Unidades en stock",
      valor: unidadesTotales,
      detalle: "+3,8% este mes",
      esAlerta: false,
      varianteIcono: "verde",
      icono: <TrendingUp size={20} />,
    },
    {
      id: "stock-bajo",
      titulo: "Stock bajo",
      valor: cantidadStockBajo,
      detalle: cantidadStockBajo > 0 ? "Requieren atención" : "Todo en orden",
      esAlerta: cantidadStockBajo > 0,
      varianteIcono: "rojo",
      icono: <AlertTriangle size={20} />,
    },
    {
      id: "valor",
      titulo: "Valor del inventario",
      valor: `${valorInventario.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} €`,
      detalle: "Valor estimado actual",
      esAlerta: false,
      varianteIcono: "violeta",
      icono: <BarChart2 size={20} />,
    },
  ];

  return (
    <section className="kpi-grid">
      {tarjetas.map((tarjeta) => (
        <article key={tarjeta.id} className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">{tarjeta.titulo}</span>
            <strong className="kpi-value">{tarjeta.valor}</strong>
            <span className={`kpi-subtext${tarjeta.esAlerta ? " alerta" : ""}`}>
              {tarjeta.detalle}
            </span>
          </div>

          <div className={`kpi-icon-box ${tarjeta.varianteIcono}`}>
            {tarjeta.icono}
          </div>
        </article>
      ))}
    </section>
  );
}

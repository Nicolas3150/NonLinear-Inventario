/* src/components/VistaResumen.jsx */
import { PRODUCTOS_MOCK } from "../../data/inventarioMock";
import { TarjetasResumen } from "../TarjetasResumen/TarjetasResumen";
import { GraficoCategorias } from "../GraficoCategorias/GraficoCategorias";
import { AlertaStockBajo } from "../AlertaStockBajo/AlertaStockBajo";
import "./VistaResumen.css";

export function VistaResumen({ productos = PRODUCTOS_MOCK }) {
  return (
    <div className="vista-resumen">
      {/* Fila 1: KPI Cards */}
      <TarjetasResumen productos={productos} />

      {/* Fila 2: Gráfico de barras + Alertas de stock bajo */}
      <section className="resumen-panels-grid">
        <GraficoCategorias productos={productos} />
        <AlertaStockBajo productos={productos} />
      </section>
    </div>
  );
}

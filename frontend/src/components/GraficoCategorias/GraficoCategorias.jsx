/* src/components/GraficoCategorias.jsx */
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { PRODUCTOS_MOCK, CATEGORIAS_MOCK } from "../../data/inventarioMock";
import "./GraficoCategorias.css";

export function GraficoCategorias({ productos = PRODUCTOS_MOCK }) {
  // Procesamos los datos igual que antes por categoría
  const datosPorCategoria = CATEGORIAS_MOCK.map((cat) => {
    const totalUnidades = productos
      .filter((p) => p.categoria.nombre === cat)
      .reduce((acc, p) => acc + p.stock_actual, 0);

    return {
      categoria: cat,
      unidades: totalUnidades,
    };
  });

  return (
    <article className="grafico-card">
      <div className="grafico-header">
        <div>
          <h3 className="grafico-title">Stock por categoría</h3>
          <p className="grafico-subtitle">
            Volumen físico disponible (Recharts)
          </p>
        </div>
        <span className="grafico-badge-actualizado">Actualizado hoy</span>
      </div>

      {/* Contenedor responsivo para el gráfico */}
      <div style={{ width: "100%", height: "220px", marginTop: "1rem" }}>
        <ResponsiveContainer>
          <BarChart
            data={datosPorCategoria}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="var(--border-color)" 
            />
            <XAxis
              dataKey="categoria"
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "var(--surface-subtle)" }}
              contentStyle={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                fontSize: "0.85rem",
                color: "var(--text-main)",
              }}
            />
            <Bar
              dataKey="unidades"
              fill="var(--color-primary)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

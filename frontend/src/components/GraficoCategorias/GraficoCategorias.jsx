/* src/components/GraficoCategorias.jsx */
import { PRODUCTOS_MOCK, CATEGORIAS_MOCK } from "../data/inventarioMock";
import "./GraficoCategorias.css";

export function GraficoCategorias({ productos = PRODUCTOS_MOCK }) {
  // Sumamos las unidades en stock por cada categoría
  const datosPorCategoria = CATEGORIAS_MOCK.map((cat) => {
    const totalUnidades = productos
      .filter((p) => p.categoria.nombre === cat)
      .reduce((acc, p) => acc + p.stock_actual, 0);

    return {
      categoria: cat,
      unidades: totalUnidades,
    };
  });

  // Encontramos el valor máximo para calcular la altura porcentual de las barras
  const maxUnidades = Math.max(...datosPorCategoria.map((d) => d.unidades), 1);

  return (
    <article className="grafico-card">
      <div className="grafico-header">
        <div>
          <h3 className="grafico-title">Stock por categoría</h3>
          <p className="grafico-subtitle">Volumen físico disponible</p>
        </div>
        <span className="grafico-badge-actualizado">Actualizado hoy</span>
      </div>

      <div className="grafico-body">
        {datosPorCategoria.map((item) => {
          // Altura proporcional (mínimo 15% para que siempre se vea la barra)
          const alturaPorcentual = Math.max(
            (item.unidades / maxUnidades) * 100,
            15,
          );

          return (
            <div key={item.categoria} className="grafico-columna">
              <div
                className="grafico-barra"
                style={{ height: `${alturaPorcentual}%` }}
                title={`${item.unidades} unidades`}
              />
              <span className="grafico-etiqueta">{item.categoria}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

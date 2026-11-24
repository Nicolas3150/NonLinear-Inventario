import { useState, useMemo } from "react";
import { Pencil, Package, Search } from "lucide-react";
import { PRODUCTOS_MOCK, CATEGORIAS_MOCK } from "../../data/inventarioMock";
import "./TablaProductos.css";

export function TablaProductos({ productos = PRODUCTOS_MOCK }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");

  const productosFiltrados = useMemo(() => {
    return productos.filter((prod) => {
      const codigoFormateado = `prd-${String(prod.id).padStart(3, "0")}`;
      const matchTexto =
        prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        codigoFormateado.includes(busqueda.toLowerCase());

      const matchCategoria =
        categoriaFiltro === "todas" ||
        prod.categoria.nombre.toLowerCase() === categoriaFiltro.toLowerCase();

      return matchTexto && matchCategoria;
    });
  }, [productos, busqueda, categoriaFiltro]);

  return (
    <div className="tabla-container">
      <div className="tabla-header">
        <div>
          <h3>Productos</h3>
          <p className="producto-codigo">
            {productosFiltrados.length} productos encontrados
          </p>
        </div>

        <div className="tabla-controles">
          <div className="input-busqueda-wrapper">
            <Search size={16} className="input-busqueda-icono" />
            <input
              type="text"
              className="input-busqueda"
              placeholder="Buscar por nombre o ID..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <select
            className="select-categoria"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="todas">Todas las categorías</option>
            {CATEGORIAS_MOCK.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="tabla-inventario">
        <thead>
          <tr>
            <th>ID Y PRODUCTO</th>
            <th>CATEGORÍA</th>
            <th>PRECIO UNITARIO</th>
            <th>STOCK ACTUAL</th>
            <th style={{ textAlign: "right" }}>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="5" className="tabla-vacia">
                No se encontraron productos con los filtros aplicados.
              </td>
            </tr>
          ) : (
            productosFiltrados.map((prod) => {
              const esStockBajo = prod.stock_actual <= prod.stock_minimo;
              return (
                <tr key={prod.id}>
                  <td>
                    <div className="producto-identidad">
                      <span
                        className={`producto-icon${esStockBajo ? " stock-bajo" : ""}`}
                      >
                        <Package size={20} />
                      </span>
                      <div>
                        <div className="producto-nombre">{prod.nombre}</div>
                        <div className="producto-codigo">
                          PRD-{String(prod.id).padStart(3, "0")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge-categoria categoria-${prod.categoria.nombre
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")}`}
                    >
                      {prod.categoria.nombre}
                    </span>
                  </td>
                  <td style={{ fontWeight: "500" }}>
                    {Number(prod.precio_unitario).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    €
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        className={`stock-valor ${esStockBajo ? "bajo" : ""}`}
                      >
                        {prod.stock_actual}
                      </span>
                      {esStockBajo && (
                        <span className="badge-stock-bajo">STOCK BAJO</span>
                      )}
                    </div>
                    <div className="stock-minimo">
                      Mín. {prod.stock_minimo} uds.
                    </div>
                  </td>
                  <td>
                    <div className="acciones-container">
                      <button
                        className="btn-accion"
                        title="Registrar movimiento de stock"
                      >
                        Registrar movimiento
                      </button>
                      <button
                        className="btn-icon-editar"
                        title="Editar producto"
                      >
                        <Pencil size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

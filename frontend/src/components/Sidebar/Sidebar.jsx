import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  BarChart3,
  Settings,
  LogOut,
  Box,
} from "lucide-react";
import "./Sidebar.css";

export function Sidebar({ vistaActual = "productos", setVistaActual }) {
  return (
    <aside className="sidebar">
      <div>
        {/* Cabecera del logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo-icon">
            <Box size={22} />
          </div>
          <div>
            <div className="sidebar-title">StockFlow</div>
            <div className="sidebar-subtitle">Inventario</div>
          </div>
        </div>

        {/* Menú Principal */}
        <ul className="sidebar-nav">
          <li
            className={`sidebar-nav-item ${vistaActual === "resumen" ? "active" : ""}`}
            onClick={() => setVistaActual && setVistaActual("resumen")}
          >
            <LayoutDashboard size={18} />
            Resumen
          </li>
          <li
            className={`sidebar-nav-item ${vistaActual === "productos" ? "active" : ""}`}
            onClick={() => setVistaActual && setVistaActual("productos")}
          >
            <Package size={18} />
            Productos
            <span className="sidebar-badge">8</span>
          </li>
          <li
            className={`sidebar-nav-item ${vistaActual === "movimientos" ? "active" : ""}`}
            onClick={() => setVistaActual && setVistaActual("movimientos")}
          >
            <ArrowLeftRight size={18} />
            Movimientos
          </li>
          <li
            className={`sidebar-nav-item ${vistaActual === "reportes" ? "active" : ""}`}
            onClick={() => setVistaActual && setVistaActual("reportes")}
          >
            <BarChart3 size={18} />
            Reportes
          </li>
        </ul>

        {/* Sección de Administración */}
        <div className="sidebar-section-title">Administración</div>
        <ul className="sidebar-nav">
          <li
            className={`sidebar-nav-item ${vistaActual === "configuracion" ? "active" : ""}`}
            onClick={() => setVistaActual && setVistaActual("configuracion")}
          >
            <Settings size={18} />
            Configuración
          </li>
        </ul>
      </div>

      {/* Pie de página con el perfil del usuario */}
      <div className="sidebar-footer">
        <div className="sidebar-user-info">
          <div className="sidebar-user-avatar">AM</div>
          <div>
            <div className="sidebar-user-name">Ana Martínez</div>
            <div className="sidebar-user-role">Administradora</div>
          </div>
        </div>
        <button className="sidebar-logout-btn" title="Cerrar sesión">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}

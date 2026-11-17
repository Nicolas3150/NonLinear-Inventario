import { Bell, Plus } from "lucide-react";
import "./Header.css";

export function Header({
  vistaActual,
  titulo = "Vista general del inventario",
  subtitulo = "Panel de control",
  onOpenMovimiento,
}) {
  return (
    <header className="header-container">
      <div className="header-titles">
        <span className="header-subtitle">{subtitulo}</span>
        <h1 className="header-title">{titulo}</h1>
      </div>

      <div className="header-actions">
        <button
          className="header-notification-btn"
          title="Notificaciones de stock"
        >
          <Bell size={18} />
          <span className="notification-badge" />
        </button>

        <button className="btn-primary-action" onClick={onOpenMovimiento}>
          <Plus size={18} />
          Registrar movimiento
        </button>
      </div>
    </header>
  );
}

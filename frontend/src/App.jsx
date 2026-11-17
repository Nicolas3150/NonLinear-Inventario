import { useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import { TablaProductos } from "./components/TablaProductos/TablaProductos";
import { VistaResumen } from "./components/VistaResumen/VistaResumen";
import { ModalMovimiento } from "./components/ModalMovimiento/ModalMovimiento";

// Configuración centralizada de encabezados por vista
const CONFIG_VISTAS = {
  resumen: {
    subtitulo: "Panel de control",
    titulo: "Vista general del inventario",
  },
  productos: {
    subtitulo: "Catálogo",
    titulo: "Gestión de productos",
  },
  movimientos: {
    subtitulo: "Historial",
    titulo: "Registro de entradas y salidas",
  },
  reportes: {
    subtitulo: "Analítica",
    titulo: "Reportes de inventario",
  },
  configuracion: {
    subtitulo: "Administración",
    titulo: "Configuración del sistema",
  },
};

export default function App() {
  // Arrancamos en "resumen" como vista por defecto (o "productos" mientras armamos el dashboard)
  const [vistaActual, setVistaActual] = useState("productos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtenemos los textos dinámicos según la vista activa
  const headerActual = CONFIG_VISTAS[vistaActual] || CONFIG_VISTAS.resumen;

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Barra lateral fija */}
      <Sidebar vistaActual={vistaActual} setVistaActual={setVistaActual} />

      {/* Área principal con scroll propio */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "2rem",
          background: "var(--bg-main)",
        }}
      >
        {/* Header dinámico según la vista */}
        <Header
          subtitulo={headerActual.subtitulo}
          titulo={headerActual.titulo}
          onOpenMovimiento={() => setIsModalOpen(true)}
        />

        {/* Renderizado condicional de las vistas */}
        {vistaActual === "resumen" && <VistaResumen />}
        {vistaActual === "productos" && <TablaProductos />}

        <ModalMovimiento 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      </main>
    </div>
  );
}

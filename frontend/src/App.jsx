import { useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { TablaProductos } from "./components/TablaProductos/TablaProductos";

export default function App() {
  const [vistaActual, setVistaActual] = useState("productos");

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar vistaActual={vistaActual} setVistaActual={setVistaActual} />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "2rem",
          background: "var(--bg-main)",
        }}
      >
        {vistaActual === "productos" && <TablaProductos />}
      </main>
    </div>
  );
}

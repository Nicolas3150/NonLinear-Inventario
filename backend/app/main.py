from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Sistema de Inventario",
    version="1.0.0",
    description="API para el sistema de inventario",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción se restringe a dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API del sistema de inventario está funcionando correctamente."}
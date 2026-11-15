from sqlalchemy.orm import Session
from app.repositories.producto_repository import ProductoRepository
from typing import List, Optional


class ProductoService:
    @staticmethod
    def listar_productos(db: Session, categoria: Optional[str] = None):
        # Aquí podrías agregar reglas de negocio adicionales si fuera necesario
        return ProductoRepository.obtener_todos(db, categoria)

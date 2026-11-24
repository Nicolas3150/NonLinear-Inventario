from sqlalchemy.orm import Session
from app.models.producto import ProductoModel
from app.models.categoria import CategoriaModel
from typing import List, Optional


class ProductoRepository:
    @staticmethod
    def obtener_todos(
        db: Session, categoria: Optional[str] = None
    ) -> List[ProductoModel]:
        query = db.query(ProductoModel).join(CategoriaModel)  # Asegura que se haga el join con la tabla de categorías

        if categoria:
            # Filtrar productos por nombre de categoría usando ilike para búsqueda insensible a mayúsculas/minúsculas
            # Se usa % para permitir búsquedas parciales
            # query = query.filter(CategoriaModel.nombre.ilike(f"%{categoria}%"))
            
            # Sin % para coincidencia exacta. Por ejemplo si el frontend usa un desplegable
            query = query.filter(CategoriaModel.nombre.ilike(f"{categoria}"))

        return query.all()

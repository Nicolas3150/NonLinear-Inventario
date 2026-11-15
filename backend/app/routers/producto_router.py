from fastapi import APIRouter, Depends, Query
from httpx2 import query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.services.producto_service import ProductoService
from app.schemas.producto import ProductoResponse

router = APIRouter(prefix="/productos", tags=["Productos"])


@router.get("/", response_model=List[ProductoResponse])
def listar_productos(
    categoria: Optional[str] = Query(
        None, description="Filtrar por nombre de categoría"
    ),
    db: Session = Depends(get_db),
):
    # validar parametro categoria
    if categoria is not None and not isinstance(categoria, str):
        raise ValueError("El parámetro 'categoria' debe ser una cadena de texto.")

    productos = ProductoService.listar_productos(db, categoria)
    return productos

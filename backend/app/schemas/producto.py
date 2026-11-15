from pydantic import BaseModel
from decimal import Decimal

class CategoriaResponse(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True
        
class ProductoResponse(BaseModel):
    id: int
    nombre: str
    precio_unitario: Decimal
    stock_actual: int
    stock_minimo: int
    categoria: CategoriaResponse # Incluye el objeto de categoría con su nombre y ID
    
    class Config:
        from_attributes = True
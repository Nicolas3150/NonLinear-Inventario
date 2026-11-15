from sqlalchemy import Column, Integer, String, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class ProductoModel(Base):
    __tablename__ = "producto"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(150), nullable=False)
    categoria_id = Column(Integer, ForeignKey("categoria.id"), nullable=False)
    precio_unitario = Column(Numeric(10, 2), nullable=False)
    stock_actual = Column(Integer, nullable=False, default=0)
    stock_minimo = Column(Integer, nullable=False, default=5)

    categoria = relationship("CategoriaModel", back_populates="productos")
    movimientos = relationship("MovimientoModel", back_populates="producto")
    auditorias = relationship("AuditoriaProductoModel", back_populates="producto")

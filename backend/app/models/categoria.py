from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.database import Base


class CategoriaModel(Base):
    __tablename__ = "categoria"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(100), unique=True, nullable=False)
    descripcion = Column(Text, nullable=True)

    productos = relationship("ProductoModel", back_populates="categoria")

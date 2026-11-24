from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey, text
from sqlalchemy.orm import relationship
from app.database import Base


class AuditoriaProductoModel(Base):
    __tablename__ = "auditoria_producto"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    producto_id = Column(Integer, ForeignKey("producto.id"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuario.id"), nullable=False)
    campo_modificado = Column(String(50), nullable=False)
    valor_anterior = Column(String(255), nullable=True)
    valor_nuevo = Column(String(255), nullable=True)
    fecha = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))

    producto = relationship("ProductoModel", back_populates="auditorias")
    usuario = relationship("UsuarioModel", back_populates="auditorias")

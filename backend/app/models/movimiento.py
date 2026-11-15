from sqlalchemy import Column, Integer, String, Enum, TIMESTAMP, ForeignKey, text
from sqlalchemy.orm import relationship
from app.database import Base


class MovimientoModel(Base):
    __tablename__ = "movimiento"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    producto_id = Column(Integer, ForeignKey("producto.id"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuario.id"), nullable=False)
    tipo = Column(Enum("ENTRADA", "SALIDA"), nullable=False)
    cantidad = Column(Integer, nullable=False)
    fecha = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))
    motivo = Column(String(255), nullable=True)

    producto = relationship("ProductoModel", back_populates="movimientos")
    usuario = relationship("UsuarioModel", back_populates="movimientos")

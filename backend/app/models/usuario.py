from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class UsuarioModel(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    rol_id = Column(Integer, ForeignKey("rol.id"), nullable=False)
    activo = Column(Boolean, default=True)

    rol = relationship("RolModel", back_populates="usuarios")
    movimientos = relationship("MovimientoModel", back_populates="usuario")
    auditorias = relationship("AuditoriaProductoModel", back_populates="usuario")

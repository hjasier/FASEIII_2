# api/__init__.py

from .Auth import auth_bp  
import logging


# Configurar el logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("[API] - El paquete api ha sido inicializado.")


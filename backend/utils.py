class ErrorCalculo(Exception):
    """Excepción para errores de cálculo"""
    def __init__(self, mensaje):
        self.mensaje = mensaje
        super().__init__(self.mensaje)

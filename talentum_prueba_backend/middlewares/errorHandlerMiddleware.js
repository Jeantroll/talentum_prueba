const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Hubo un error en el servidor.';
  
    res.status(statusCode).json({ error: message });
  };
  
  module.exports = errorHandlerMiddleware;
  
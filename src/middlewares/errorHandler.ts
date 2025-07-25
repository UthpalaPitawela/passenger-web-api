import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,               
  req: Request,            
  res: Response,         
  next: NextFunction      
) => {
  console.error('❌ Error:', err);

  const statusCode = err.statusCode || 500;

  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;

import { Request, Response, NextFunction } from 'express';
import Error from '../interface/error.interface';
const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = error.message;
  const status = error.status || 500;
  res.status(status).json({
    message,
  });
};

export default errorMiddleware;

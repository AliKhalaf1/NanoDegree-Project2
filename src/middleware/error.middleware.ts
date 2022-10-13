import { Request, Response, NextFunction } from 'express';
const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = error.message;
  res.status(500).json({
    message,
  });
};

export default errorMiddleware;

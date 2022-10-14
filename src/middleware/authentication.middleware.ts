import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Error from '../interface/error.interface';
import config from '../config';

const handleAuthenticationError = (next: NextFunction) => {
  const error: Error = new Error('Authentication Failed');
  error.status = 401;
  next(error);
};
const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const bear = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      console.log('a');

      if (token && bear === 'bearer') {
        const decode = jwt.verify(token, config.jwtSecret as unknown as string);
        if (decode) {
          next();
        } else {
          handleAuthenticationError(next);
        }
      }
    } else {
      handleAuthenticationError(next);
    }
  } catch (err) {
    handleAuthenticationError(next);
  }
};

export default validateToken;

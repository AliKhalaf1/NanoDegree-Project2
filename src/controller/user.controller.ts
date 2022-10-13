import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.create(req.body);
    res.json({
      status: 'success',
      message: 'user created succesfully',
    });
  } catch (err) {
    next(err);
  }
};

import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';
const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.create(req.body);
    res.json({
      data: { ...users },
      status: 'success',
      message: 'user created succesfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getAllUsers();
    res.json({
      data: users,
      status: 'success',
      message: 'users retrieved succesfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getUserById(
      req.params.id as unknown as string
    );
    res.json({
      data: user,
      status: 'success',
      message: 'user retrieved succesfully',
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateUser(req.body);
    if (!user.id) {
      throw new Error('no id');
    }
    res.json({
      data: user,
      status: 'success',
      message: 'users updated succesfully',
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteUser(req.params.id as unknown as string);
    res.json({
      data: user,
      status: 'success',
      message: 'user deleted',
    });
  } catch (err) {
    next(err);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const token = jwt.sign({ user }, config.jwtSecret as unknown as string);
    if (!user) {
      return res.status(401).json({
        message: 'username and password deosnt match',
      });
    }
    res.json({
      data: { ...user, token },
      status: 'success',
      message: 'user authenticated successfully',
    });
  } catch (err) {
    return next(err);
  }
};

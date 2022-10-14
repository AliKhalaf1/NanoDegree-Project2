import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/products.model';
const productModel = new ProductModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.create(req.body);
    res.json({
      data: { ...products },
      status: 'success',
      message: 'product created succesfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getAllproducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.getAllProducts();
    res.json({
      data: products,
      status: 'success',
      message: 'products retrieved succesfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getPorductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await productModel.getProductById(
      req.params.id as unknown as string
    );
    res.json({
      data: user,
      status: 'success',
      message: 'product retrieved succesfully',
    });
  } catch (err) {
    next(err);
  }
};

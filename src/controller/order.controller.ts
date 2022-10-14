import { NextFunction, Request, Response } from 'express';
import OrderModel from '../models/orders.model';
import config from '../config';
const orderModel = new OrderModel();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.createOrder(req.body);
    res.json({
      data: order,
      status: 'success',
      message: 'order created succesfully',
    });
  } catch (err) {
    next(err);
  }
};
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.getAllOrders();
    res.json({
      data: order,
      status: 'success',
      message: 'orders retreived succesfully',
    });
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId: string = req.params.order_id;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);
    const order = await orderModel.addProduct(quantity, orderId, productId);
    res.json({
      data: order,
      status: 'success',
      message: 'product added to order succesfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getOrdersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.user_id;
    // const productId: string = req.body.productId;
    // const quantity: number = parseInt(req.body.quantity);
    const order = await orderModel.getOrdersByUserId(userId);
    res.json({
      data: order,
      status: 'success',
      message: 'orders retreived succesfully',
    });
  } catch (err) {
    next(err);
  }
};

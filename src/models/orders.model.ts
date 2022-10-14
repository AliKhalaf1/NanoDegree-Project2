import Order from '../types/order.model';
import db from '../database';
import User from '../types/user.model';

class OrderModel {
  async getAllOrders(): Promise<Order[]> {
    try {
      const connect = await db.connect();
      const sql =
        'SELECT user_id,firstname,lastname,email,status,orders.id AS order_id FROM orders INNER JOIN users ON users.id = orders.user_id;';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to create product:${(err as Error).message}`);
    }
  }

  async createOrder(user: User): Promise<Order> {
    try {
      const connect = await db.connect();
      const sql =
        'INSERT INTO orders (user_id,status) VALUES ($1,$2) returning *;';
      const result = await connect.query(sql, [user.id, 'pending']);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create order:${(err as Error).message}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const connect = await db.connect();
      const sql =
        'INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) returning *;';
      const result = await connect.query(sql, [quantity, orderId, productId]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create order:${(err as Error).message}`);
    }
  }
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const connect = await db.connect();
      const sql =
        'SELECT order_id,product_id,name AS product_name,price AS product_price,quantity,status FROM orders INNER JOIN order_products ON orders.id = order_products.order_id INNER JOIN products ON products.id = order_products.product_id WHERE user_id=$1;';
      const result = await connect.query(sql, [userId]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to create product:${(err as Error).message}`);
    }
  }
}

export default OrderModel;

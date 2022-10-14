import Product from '../types/products.model';
import db from '../database';

class ProductModel {
  async create(p: Product): Promise<Product> {
    try {
      const connect = await db.connect();
      const sql =
        'INSERT INTO products (name,price) VALUES ($1,$2) returning *;';
      const result = await connect.query(sql, [p.name, p.price]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create product:${(err as Error).message}`);
    }
  }
  async getAllProducts(): Promise<Product[]> {
    try {
      const connect = await db.connect();
      const sql = 'SELECT * FROM products;';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get product:${(err as Error).message}`);
    }
  }
  async getProductById(id: string): Promise<Product> {
    try {
      const connect = await db.connect();
      const sql = 'SELECT * FROM products WHERE id =($1);';
      const result = await connect.query(sql, [id]);
      connect.release();
      if (result.rows.length) {
        return result.rows[0];
      } else {
        throw new Error(` user not found`);
      }
    } catch (err) {
      throw new Error(`Unable to return user:${(err as Error).message}`);
    }
  }
}

export default ProductModel;

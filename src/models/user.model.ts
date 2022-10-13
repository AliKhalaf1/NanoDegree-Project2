import User from '../types/user.model';
import db from '../database';
import { Connection } from 'pg';
class UserModel {
  async create(u: User): Promise<User> {
    try {
      const connect = await db.connect();
      const sql =
        'INSERT INTO users (firstname,lastname,password) VALUES ($1,$2,$3) returning *;';
      const result = await connect.query(sql, [
        u.firstname,
        u.lastname,
        u.password,
      ]);
      connect.release();
      return result.rows[0];
    } catch {
      throw new Error('Unable to create user');
    }
  }
}

export default UserModel;

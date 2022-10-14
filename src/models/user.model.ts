import User from '../types/user.model';
import db from '../database';
import config from '../config';
import bcrypt from 'bcrypt';
const hashpass = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};
class UserModel {
  async create(u: User): Promise<User> {
    try {
      const connect = await db.connect();
      const sql =
        'INSERT INTO users (email,firstname,lastname,password) VALUES ($1,$2,$3,$4) returning *;';
      const result = await connect.query(sql, [
        u.email,
        u.firstname,
        u.lastname,
        hashpass(u.password),
      ]);
      connect.release();
      return result.rows[0];
    } catch {
      throw new Error('Unable to create user');
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const connect = await db.connect();
      const sql = 'SELECT id,email,firstname,lastname FROM users;';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to return users: ${(err as Error).message}`);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const connect = await db.connect();
      const sql =
        'SELECT id,email,firstname,lastname FROM users WHERE id =($1);';
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

  async updateUser(u: User): Promise<User> {
    try {
      const connect = await db.connect();
      const sql =
        'UPDATE users SET email =$1,firstname=$2,lastname=$3,password=$4 WHERE id = $5 RETURNING id,email,firstname,lastname';
      const result = await connect.query(sql, [
        u.email,
        u.firstname,
        u.lastname,
        hashpass(u.password),
        u.id,
      ]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to patch users: ${(err as Error).message}`);
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const connect = await db.connect();
      const sql =
        'DELETE FROM users WHERE id =($1) RETURNING id,email,firstname,lastname';
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to delete user:${(err as Error).message}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connect = await db.connect();
      const sql = 'SELECT password FROM users WHERE email =($1);';
      const result = await connect.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashpassword } = result.rows[0];
        const isPaswordCorrect = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashpassword
        );
        if (isPaswordCorrect) {
          const userQuery =
            'SELECT id, firstname,lastname FROM users WHERE email =($1)';
          const user = await connect.query(userQuery, [email]);
          return user.rows[0];
        }
      }
      connect.release();
      return null;
    } catch (error) {
      throw new Error(`cannot authenticate : ${(error as Error).message}`);
    }
  }
}

export default UserModel;

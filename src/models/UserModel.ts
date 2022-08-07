import { config } from "dotenv";
import cliant from "../Configs/db";
import bcrypt from "bcrypt";
config();

export type User = {
  id: number;
  fristName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserModel {
  async getUserByEmail(email: string): Promise<User> {
    return cliant
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e);
      }); // get user by email
  }
  async getUsers(): Promise<User[]> {
    return await cliant
      .query(
        "SELECT id,frist_name,last_name, email,created_at, updated_at FROM users"
      )
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        throw new Error(e);
      }); // get all users
  }
  async getUser(id: number): Promise<User> {
    return await cliant
      .query(
        "SELECT id,frist_name,last_name, email,created_at, updated_at FROM users WHERE id = $1",
        [id]
      )
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e);
      }); // get all users
  }

  async createUser(user: User) {
    return await cliant
      .query(
        "INSERT INTO users (frist_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [
          user.fristName,
          user.lastName,
          user.email,
          bcrypt.hashSync(
            user.password + process.env.OTHER_PASSWORD,
            Number(process.env.ROUND)
          ),
        ]
      )
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e);
      }); // create user
  }

  async updateUser(user: User): Promise<User> {
    return await cliant
      .query(
        "UPDATE users SET frist_name=$1, last_name=$2, email = $3, password = $4 RETURNING id",
        [
          user.fristName,
          user.lastName,
          user.email,
          bcrypt.hashSync(
            user.password + process.env.OTHER_PASSWORD,
            Number(process.env.ROUND)
          ),
        ]
      )
      .then((user) => {
        return user.rows[0];
      })
      .catch((e) => {
        throw new Error(e);
      }); // update user  and return user
  }

  async deleteUser(id: number): Promise<Number> {
    return await cliant
      .query("DELETE FROM users WHERE id = $1", [id])
      .then((res) => {
        return res.rowCount;
      })
      .catch((e) => {
        throw new Error(e);
      }); // delete user and return number of rows deleted
  }
}

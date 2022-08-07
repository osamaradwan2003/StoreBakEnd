import { config } from "dotenv";
import cliant from "../Configs/db";

config();

export type Order = {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  status: string;
};

export class OrderModel {
  public async getCompletedOrdersByUserId(id: number): Promise<Order[]> {
    const query: string = `SELECT * FROM orders WHERE user_id = ${id} AND status = 'completed'`;
    const orders = await cliant.query(query);
    return orders.rows;
  }
  //get order by id
  public async getOrderByID(id: string): Promise<Order> {
    const query = `SELECT * FROM orders WHERE id = ${id}`;
    const result = await cliant.query(query);
    return result.rows[0];
  }
  //create Order
  public async createOrder(order: Order): Promise<Order> {
    const { user_id, product_id, quantity } = order;
    const query = `INSERT INTO orders (user_id, product_id, quantity) VALUES (${user_id}, ${product_id}, ${quantity}) returning *`;
    const result = await cliant.query(query);
    return result.rows[0];
  }

  //get all orders by user id
  public async getAllOrdersByUserId(userId: number): Promise<Order[]> {
    const query = `SELECT * FROM orders WHERE user_id = ${userId}`;
    const result = await cliant.query(query);
    return result.rows;
  }

  //update order by id
  public async updateOrder(order: Order): Promise<Order> {
    const { id, user_id, product_id, quantity, status } = order;
    const query = `UPDATE orders SET user_id = ${user_id}, product_id = ${product_id}, quantity = ${quantity}, updated_at = 'now()', status = '${status}' WHERE id = ${id} RETURNING *`;
    const result = await cliant.query(query);
    return result.rows[0];
  }

  public async getOrderByIdAndUserID(
    userID: string,
    orderID: string
  ): Promise<Order> {
    const query = `SELECT * FROM orders WHERE id = ${orderID} AND user_id = ${userID}`;
    const result = await cliant.query(query);
    return result.rows[0];
  }
  //get order by id and status is completed
  public async getOrderByIdAndStatusIsCompleted(id: number): Promise<Order> {
    const query = `SELECT * FROM orders WHERE id = ${id} AND status = 'completed'`;
    const result = await cliant.query(query);
    return result.rows[0];
  }

  //delete order by id
  public async deleteOrderById(id: string): Promise<Order> {
    const query = `DELETE FROM orders WHERE id = ${id}`;
    const result = await cliant.query(query);
    return result.rows[0];
  }

  //get all orders
  public async getAllOrders(): Promise<Order[]> {
    const query = `SELECT * FROM orders`;
    const result = await cliant.query(query);
    return result.rows;
  }
}

import { JwtAuth } from "./../middleware/JwtAuth";
import { config } from "dotenv";
import { Order, OrderModel } from "./../models/OrderModel";
import express, { Request, Response, Router } from "express";
config();

export class OrderController {
  private orderModel: OrderModel;
  private route_idt: string;

  constructor(route_idt = "orders") {
    this.orderModel = new OrderModel();
    this.route_idt = route_idt;
  }

  public async getOrders(req: Request, res: Response) {
    const Userid = req.params.id;
    if (!Userid && isNaN(parseInt(Userid))) {
      res.status(400).json({ error: "Bad Request invalid user id" });
      return;
    }

    this.orderModel
      .getAllOrdersByUserId(parseInt(Userid))
      .then((order) => {
        if (order) {
          //success 200 ok response with json object of user
          res.json(order);
        } else {
          //route 404 not found response with json error message
          res.status(404).json({ error: "Order undefined" });
        }
      })
      .catch((e) => {
        //server error 500 and response json error message
        res.status(500).json({ error: e.message });
      });
  } // end getOrder

  //cretae order route /orders and return json object response of order
  public async createOrder(req: Request, res: Response) {
    console.log(req.body);
    const order: Order = req.body as Order;
    if (order.user_id && order.product_id && order.quantity) {
      this.orderModel
        .createOrder(order)
        .then((order) => {
          //success 201 created response with json object of order
          res.status(201).json(order);
        })
        .catch((e) => {
          //server error 500 and response json error message
          res.status(500).json({ error: e.message });
        });
    } else {
      //400 bad request response with json error message
      res.status(400).json({ error: "Bad Request invalid order" });
    }
  } // end createOrder

  //update order route /orders/:id and return json object response of order
  public async updateOrder(req: Request, res: Response) {
    const user_id: string =
      req.params.id != "" && !isNaN(parseInt(req.params.id))
        ? req.params.id
        : "";
    const order_id: string =
      req.params.order_id != "" && !isNaN(parseInt(req.params.order_id))
        ? req.params.order_id
        : "";
    if (!user_id && !order_id) {
      return res.status(400).json({ error: "Bad Request invalid order id" });
    }

    this.orderModel
      .getOrderByIdAndUserID(user_id, order_id)
      .then((order) => {
        if (!order) {
          return res.status(404).json({ error: "Order undefined" });
        }
        const newOrder: Order = req.body as Order;
        const updatedOrder = {
          ...order,
          ...newOrder,
        };
        this.orderModel
          .updateOrder(updatedOrder)
          .then((order) => {
            //success 200 ok response with json object of order
            res.status(202).json(order);
          })
          .catch((e) => {
            //server error 500 and response json error message
            res.status(500).json({ error: e.message });
          });
      })
      .catch((e) => {
        //server error 500 and response json error message
        res.status(500).json({ error: e.message });
      });
  } // end updateOrder

  //delete order route /orders/:id and return json object response of order
  public async deleteOrder(req: Request, res: Response) {
    const ID =
      req.params.id && !isNaN(parseInt(req.params.id)) ? req.params.id : "";
    if (!ID) {
      res.status(400).json({ error: "Bad Request invalid order id" });
      return;
    }

    this.orderModel
      .deleteOrderById(ID)
      .then((order) => {
        //success 200 ok response with json object of order
        res.json({ body: order, message: "Order deleted successfully" });
      })
      .catch((e) => {
        //server error 500 and response json error message
        res.status(500).json({ error: e.message });
      });
  }

  public async getCompletedOrders(req: Request, res: Response) {
    const Userid = req.params.id;
    if (!Userid && isNaN(parseInt(Userid))) {
      res.status(400).json({ error: "Bad Request invalid user id" });
      return;
    }

    this.orderModel
      .getCompletedOrdersByUserId(parseInt(Userid))
      .then((order) => {
        if (order) {
          //success 200 ok response with json object of user
          res.json(order);
        } else {
          //route 404 not found response with json error message
          res.status(404).json({ error: "Order undefined" });
        }
      })
      .catch((e) => {
        //server error 500 and response json error message
        res.status(500).json({ error: e.message });
      });
  }

  public routes(): Router {
    const router: Router = Router();
    router.get(
      `/${this.route_idt}/:id(\\d+)`,
      [JwtAuth.VerifyJwtAuth],
      this.getOrders.bind(this)
    );
    router.get(
      `/${this.route_idt}/:id(\\d+)/completed`,
      [JwtAuth.VerifyJwtAuth],
      this.getCompletedOrders.bind(this)
    );
    router.post(
      `/${this.route_idt}/:id(\\d+)`,
      [JwtAuth.VerifyJwtAuth],
      this.createOrder.bind(this)
    );
    router.put(
      `/${this.route_idt}/:id(\\d+)/:order_id(\\d+)`,
      [JwtAuth.VerifyJwtAuth],
      this.updateOrder.bind(this)
    );
    router.delete(
      `/${this.route_idt}/:id(\\d+)`,
      [JwtAuth.VerifyJwtAuth],
      this.deleteOrder.bind(this)
    );
    return router;
  }
}

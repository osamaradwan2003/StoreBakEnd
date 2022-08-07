import { User, UserModel } from "../models/UserModel";
import express, { Request, Response } from "express";
import { config } from "dotenv";
import { JwtAuth } from "../middleware/JwtAuth";
const bcrypt = require("bcrypt");

config();

export class UserController {
  private UserModel: UserModel;
  private route_idt: string;
  public constructor(route_idt = "users") {
    this.UserModel = new UserModel();
    this.route_idt = route_idt;
    //get all users route /users and return json array response of users
  }

  public async getUsers(req: Request, res: Response) {
    this.UserModel.getUsers()
      .then((users) => {
        // success 200 ok response with json array of users
        res.json(users);
      })
      .catch((e) => {
        // server error 500 and response json error message
        res.status(500).json({ error: e.message });
      });
  } // end getUsers

  public async getUser(req: Request, res: Response) {
    const auth = req.headers.authorization?.split(" ")[1];
    if (req.params.id && !isNaN(Number(req.params.id))) {
      this.UserModel.getUser(parseInt(req.params.id))
        .then((user) => {
          if (user) {
            //success 200 ok response with json object of user
            res.json(user);
          } else {
            //route 404 not found response with json error message
            res.status(404).json({ error: "User undefined" });
          }
        })
        .catch((e) => {
          //server error 500 and response json error message
          res.status(500).json({ error: e.message });
        });
    } else {
      //400 bad request response with json error message
      res.status(400).json({ error: "Bad Request invalid user id" });
    }
  } // end getUser

  public async createUser(req: Request, res: Response) {
    const user: User = req.body as User;
    if (user.fristName && user.lastName && user.email && user.password) {
      this.UserModel.createUser(user)
        .then((user) => {
          JwtAuth.CreateJwtAuth({ id: user.id })
            .then((token) => {
              //success 201 created response with json object of user and token
              res.status(201).json({ token: token });
            })
            .catch((err) => {
              //server error 500 and response json error message
              res.status(500).json({ error: err.message });
            });
        })
        .catch((err) => {
          //server error 500 and response json error message
          res.status(500).json({ error: err.message });
        });
    } else {
      //400 bad request response with json error message
      res.status(400).json({ error: "Bad Request" });
    }
  }

  public async logIn(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email && !password) {
      res.status(400).json({ error: "Bad Request" });
      return;
    }
    const user: User = await this.UserModel.getUserByEmail(email);
    if (user) {
      const isValid = await bcrypt.compare(
        password + process.env.OTHER_PASSWORD,
        user.password
      );
      if (isValid) {
        await JwtAuth.CreateJwtAuth({ id: user.id })
          .then((token) => {
            //success 201 login response with json object of user and token
            res.status(201).json({ token: token });
          })
          .catch((err) => {
            //server error 500 and response json error message
            res.status(500).json({ error: err.message });
          });
      } else {
        //401 unauthorized response with json error message
        res.status(401).json({ error: "Invalid Password" });
      }
    } else {
      //404 user note found response with json error message
      res.status(404).json({ error: "User not found" });
    }
  }

  public routes(): express.Router {
    const userRoutes = express.Router();
    userRoutes.get(
      `/${this.route_idt}`,
      [JwtAuth.VerifyJwtAuth],
      this.getUsers.bind(this)
    );
    userRoutes.get(
      `/${this.route_idt}/:id`,
      [JwtAuth.VerifyJwtAuth],
      this.getUser.bind(this)
    );
    userRoutes.post(`/${this.route_idt}`, this.createUser.bind(this));
    userRoutes.post(`/${this.route_idt}/login`, this.logIn.bind(this));
    return userRoutes;
  }
}

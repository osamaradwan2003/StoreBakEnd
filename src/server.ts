import { OrderController } from "./Handlers/OrderController";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import router from "./routes";
import __init__ from "./bootstrabs/initailaze";
import { UserController } from "./Handlers/UserController";
import { ProductController } from "./Handlers/ProductController";
const app: express.Application = express();
__init__();

let port: number = 80;
if (process.env.NODE_ENV === "test") {
  port = 3000;
}
const address: string = "http://0.0.0.0:" + String(port);

app.use(bodyParser.json());
app.use(router);
app.use(new UserController().routes());
app.use(new ProductController().routes());
app.use(new OrderController().routes());

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;

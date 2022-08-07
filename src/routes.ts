import { JwtAuth } from "./middleware/JwtAuth";
import { config } from "dotenv";
import { Router, Request, Response } from "express";
config();

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "StoreBackend" });
});

export default router;

import { config } from "dotenv";
import { JwtAuth } from "../middleware/JwtAuth";
config();

export default function __init__() {
  JwtAuth.__init({
    secreteKey: process.env.JWT_SECRET_KEY as string,
    expiresIn: "1d",
    algorithm: "HS256",
  });
}

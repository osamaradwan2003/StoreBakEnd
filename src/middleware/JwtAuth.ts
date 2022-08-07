import { config } from "dotenv";
import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

config();
type JwtAuthConfigs = {
  secreteKey: string;
  expiresIn: string | Date;
  algorithm: string;
};

export class JwtAuth {
  private static secreteKey: string;
  private static expiresIn: string | Date;
  private static algorithm: string;
  public static __init(JwtAuthConfigs: JwtAuthConfigs): JwtAuth {
    this.secreteKey =
      JwtAuthConfigs.secreteKey || (process.env.JWT_SECRET_KEY as string);
    this.expiresIn = JwtAuthConfigs.expiresIn || "1d";
    this.algorithm = JwtAuthConfigs.algorithm || "HS256";
    return JwtAuth;
  }
  public static async CreateJwtAuth(jsonObject: Object): Promise<string> {
    return await jwt.sign(jsonObject, JwtAuth.secreteKey, {
      expiresIn: JwtAuth.expiresIn,
    });
  }

  //verify a JwtAuth instance
  public static async VerifyJwtAuth(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    const auth: string =
      (req.headers.authorization as string) ||
      (req.headers.Authorization as string) ||
      "";

    jwt.verify(
      auth.split(" ")[1],
      JwtAuth.secreteKey,
      (err: any, decoded: any) => {
        if (err) {
          res.status(401).json({ error: err.message });
        } else {
          // req.payload = decoded;
          next();
        }
      }
    );
  }

  public static async decodeToken(token: string): Promise<any> {
    return await jwt.verify(token, JwtAuth.secreteKey);
  }
}

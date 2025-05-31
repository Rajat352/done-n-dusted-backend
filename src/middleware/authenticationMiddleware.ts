import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret);
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    console.error("Couldn't verify token!");
    res.status(401).json({ error: "Invalid Token" });
  }
};

import jwt from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";

import config from "../config";

import type { TJwtPayload } from "../types/jwt";

const auth = () => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret
      ) as TJwtPayload;

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default auth;
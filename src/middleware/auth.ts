import jwt from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import config from "../config";

import type { TJwtPayload } from "../types/jwt";

const auth =
  (...requiredRoles: string[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(
          StatusCodes.UNAUTHORIZED
        ).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret
      ) as TJwtPayload;

      req.user = decoded;

      // role check
      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(decoded.role)
      ) {
        return res.status(
          StatusCodes.FORBIDDEN
        ).json({
          success: false,
          message:
            "You are not authorized",
        });
      }

      next();
    } catch (error) {
      return res.status(
        StatusCodes.UNAUTHORIZED
      ).json({
        success: false,
        message:
          "Invalid or expired token",
      });
    }
  };

export default auth;
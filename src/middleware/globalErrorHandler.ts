import type { NextFunction, Request, Response, } from "express";

import { StatusCodes } from "http-status-codes";

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode =
    StatusCodes.INTERNAL_SERVER_ERROR;

  if (error.message === "Issue not found") {
    statusCode = StatusCodes.NOT_FOUND;
  }

  else if (
    error.message === "Unauthorized access"
  ) {
    statusCode = StatusCodes.UNAUTHORIZED;
  }

  else if (
    error.message ===
      "You are not authorized"
  ) {
    statusCode = StatusCodes.FORBIDDEN;
  }

  else {
    statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
  });
};

export default globalErrorHandler;
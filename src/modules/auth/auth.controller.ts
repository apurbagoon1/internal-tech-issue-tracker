import { StatusCodes } from "http-status-codes";

import type { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";

import sendResponse from "../../utils/sendResponse";

import { AuthServices } from "./auth.service";

const signupUser = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await AuthServices.signupUserIntoDB(
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message:
        "User registered successfully",
      data: result,
    });
  }
);

const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await AuthServices.loginUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Login successful",
      data: result,
    });
  }
);

export const AuthControllers = {
  signupUser,
  loginUser,
};
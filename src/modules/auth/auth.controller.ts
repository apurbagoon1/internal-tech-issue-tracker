import type { Request, Response } from "express";import { StatusCodes } from "http-status-codes";

import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.signupUserIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User registered successfully",
      data: result,
    });
  } 
  catch (error) {
    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.UNAUTHORIZED,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const AuthControllers = {
  signupUser,
  loginUser,
};
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
  } catch (error) {
    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const AuthControllers = {
  signupUser,
};
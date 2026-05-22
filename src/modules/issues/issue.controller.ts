import { StatusCodes } from "http-status-codes";

import type { Request, Response } from "express";

import sendResponse from "../../utils/sendResponse";

import { IssueServices } from "./issue.service";

const createIssue = async (
  req: Request,
  res: Response
) => {
  try {
    const reporterId = req.user.id;

    const result =
      await IssueServices.createIssueIntoDB(
        req.body,
        reporterId
      );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Issue created successfully",
      data: result,
    });
  } 
  catch (error) {
    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const IssueControllers = {
  createIssue,
};
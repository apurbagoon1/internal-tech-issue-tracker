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

const getAllIssues = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await IssueServices.getAllIssuesFromDB(
        req.query as Record<string, string>
      );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Issues retrieved successfully",
      data: result,
    });
  } 
  catch (error) {
    sendResponse(res, {
      success: false,
      statusCode:
        StatusCodes.INTERNAL_SERVER_ERROR,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

const getSingleIssue = async (
  req: Request,
  res: Response
) => {
  try {
    const issueId = Number(req.params.id);

    const result =
      await IssueServices.getSingleIssueFromDB(
        issueId
      );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Issue retrieved successfully",
      data: result,
    });
  } 
  catch (error) {
    sendResponse(res, {
      success: false,

      statusCode:
        error instanceof Error &&
        error.message === "Issue not found"
          ? StatusCodes.NOT_FOUND
          : StatusCodes.INTERNAL_SERVER_ERROR,

      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

const updateIssue = async (
  req: Request,
  res: Response
) => {
  try {
    const issueId = Number(req.params.id);

    const result =
      await IssueServices.updateIssueIntoDB(
        issueId,
        req.body,
        req.user
      );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Issue updated successfully",
      data: result,
    });
  } 
  catch (error) {
    let statusCode =
      StatusCodes.INTERNAL_SERVER_ERROR;

    if (
      error instanceof Error &&
      error.message === "Issue not found"
    ) {
      statusCode = StatusCodes.NOT_FOUND;
    }

    else if (
      error instanceof Error &&
      (
        error.message ===
          "You can only update your own issues" ||

        error.message ===
          "You cannot update non-open issues"
      )
    ) {
      statusCode = StatusCodes.CONFLICT;
    }

    else if (error instanceof Error) {
      statusCode = StatusCodes.BAD_REQUEST;
    }

    sendResponse(res, {
      success: false,
      statusCode,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

const deleteIssue = async (
  req: Request,
  res: Response
) => {
  try {
    const issueId = Number(req.params.id);

    await IssueServices.deleteIssueFromDB(
      issueId
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Issue deleted successfully",
      data: null,
    });
  } catch (error) {
    sendResponse(res, {
      success: false,

      statusCode:
        error instanceof Error &&
        error.message === "Issue not found"
          ? StatusCodes.NOT_FOUND
          : StatusCodes.INTERNAL_SERVER_ERROR,

      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const IssueControllers = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
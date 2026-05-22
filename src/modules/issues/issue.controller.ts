import { StatusCodes } from "http-status-codes";

import type { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";

import sendResponse from "../../utils/sendResponse";

import { IssueServices } from "./issue.service";

const createIssue = asyncHandler(
  async (req: Request, res: Response) => {
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
);

const getAllIssues = asyncHandler(
  async (req: Request, res: Response) => {
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
);

const getSingleIssue = asyncHandler(
  async (req: Request, res: Response) => {
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
);

const updateIssue = asyncHandler(
  async (req: Request, res: Response) => {
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
);

const deleteIssue = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);

export const IssueControllers = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
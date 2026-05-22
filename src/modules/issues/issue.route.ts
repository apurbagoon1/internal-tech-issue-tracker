import express from "express";

import auth from "../../middleware/auth";

import { IssueControllers } from "./issue.controller";

const router = express.Router();

router.post(
  "/",
  auth(),
  IssueControllers.createIssue
);

router.get("/", IssueControllers.getAllIssues);

router.get("/:id", IssueControllers.getSingleIssue);

export const IssueRoutes = router;
import { pool } from "../../db";

import type { TCreateIssue } from "./issue.interface";

const createIssueIntoDB = async (
  payload: TCreateIssue,
  reporterId: number
) => {
  const { title, description, type } = payload;

  if (title.length > 150) {
    throw new Error("Title cannot exceed 150 characters");
  }

  if (description.length < 20) {
    throw new Error(
      "Description must be at least 20 characters"
    );
  }

  const result = await pool.query(
    `
    INSERT INTO issues(
      title,
      description,
      type,
      reporter_id
    )
    VALUES($1, $2, $3, $4)
    RETURNING *
    `,
    [title, description, type, reporterId]
  );

  return result.rows[0];
};

const getAllIssuesFromDB = async (
  query: Record<string, string>
) => {
  const { sort = "newest", type, status } = query;

  let sqlQuery = `SELECT * FROM issues`;

  const conditions: string[] = [];

  const values: string[] = [];

  if (type) {
    values.push(type);

    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);

    conditions.push(`status = $${values.length}`);
  }

  if (conditions.length > 0) {
    sqlQuery += ` WHERE ${conditions.join(" AND ")}`;
  }

  if (sort === "oldest") {
    sqlQuery += ` ORDER BY created_at ASC`;
  } else {
    sqlQuery += ` ORDER BY created_at DESC`;
  }

  const issueResult = await pool.query(
    sqlQuery,
    values
  );

  const issues = issueResult.rows;

  const reporterIds = [
    ...new Set(
      issues.map((issue) => issue.reporter_id)
    ),
  ];

  let reporters: {
    id: number;
    name: string;
    role: string;
  }[] = [];

  if (reporterIds.length > 0) {
    const reporterQuery = `
      SELECT id, name, role
      FROM users
      WHERE id = ANY($1)
    `;

    const reporterResult = await pool.query(
      reporterQuery,
      [reporterIds]
    );

    reporters = reporterResult.rows;
  }

  const formattedIssues = issues.map((issue) => {
    const reporter = reporters.find(
      (user) => user.id === issue.reporter_id
    );

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,

      reporter: reporter || null,

      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  });

  return formattedIssues;
};

export const IssueServices = {
  createIssueIntoDB,
  getAllIssuesFromDB,
};
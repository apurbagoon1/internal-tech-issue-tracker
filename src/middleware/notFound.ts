import type { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

const notFound = (
  req: Request,
  res: Response
) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message:
      "Requested resource could not be found",
  });
};

export default notFound;
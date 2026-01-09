import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statsCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    statsCode = 400;
    errorMessage = "You provide incorrect field type or missing fields";
  }

  res.status(500);
  res.json({
    message: errorMessage,
    error: errorDetails,
  });
}

export default errorHandler;

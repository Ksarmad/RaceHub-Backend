import { Request, Response, NextFunction } from "express";

import { ZodError } from "zod";

import AppError from "../errors/AppError";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  // Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }

  // Custom AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // Unknown errors
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorHandler;
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

  // Zod Validation Error
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues,
    });
  }

  // AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // Prisma Unique Error
  if (
    error.code === "P2002"
  ) {
    return res.status(409).json({
      success: false,
      message:
        "Duplicate entry detected",
    });
  }

  // If we have a message from a non-AppError, surface it for better frontend errors
  if (error?.message) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // Default Error
  return res.status(500).json({
    success: false,
    message:
      "Internal server error",
  });
};

export default errorHandler;
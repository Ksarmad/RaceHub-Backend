import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import AppError from "../errors/AppError";

interface JwtPayload {
  adminId: string;
}

export interface AuthRequest
  extends Request {
  admin?: JwtPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      "Unauthorized",
      401
    );
  }

  const token =
    authHeader.split(" ")[1];

  if (!token) {
    throw new AppError(
      "Unauthorized",
      401
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.admin = decoded;

    next();
  } catch (error) {
    throw new AppError(
      "Invalid token",
      401
    );
  }
};

export default authMiddleware;
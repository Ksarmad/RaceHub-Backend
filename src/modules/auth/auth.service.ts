import bcrypt from "bcryptjs";

import prisma from "../../config/prisma";

import AppError from "../../common/errors/AppError";

import { generateAccessToken } from "../../common/utils/token";

import { AdminLoginInput } from "./auth.types";

export class AuthService {
  static async login(
    data: AdminLoginInput
  ) {
    const admin =
      await prisma.admin.findUnique({
        where: {
          email: data.email,
        },
      });

    if (!admin) {
      throw new AppError(
        "Invalid credentials",
        401
      );
    }

    const isPasswordValid =
      await bcrypt.compare(
        data.password,
        admin.password
      );

    if (!isPasswordValid) {
      throw new AppError(
        "Invalid credentials",
        401
      );
    }

    const accessToken =
      generateAccessToken(admin.id);

    return {
      admin: {
        id: admin.id,
        email: admin.email,
      },

      accessToken,
    };
  }
}
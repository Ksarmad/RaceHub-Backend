import { Request, Response } from "express";

import asyncHandler from "../../common/utils/asyncHandler";

import { adminLoginSchema } from "./auth.validation";

import { AuthService } from "./auth.service";

export class AuthController {
  static login = asyncHandler(
    async (req: Request, res: Response) => {
      const validatedData =
        adminLoginSchema.parse(req.body);

      const data =
        await AuthService.login(
          validatedData
        );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data,
      });
    }
  );
}
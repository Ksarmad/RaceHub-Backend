import { Request, Response } from "express";

import asyncHandler from "../../common/utils/asyncHandler";

import { registerSchema } from "./registration.validation";

import { RegistrationService } from "./registration.service";

export class RegistrationController {
  static register = asyncHandler(
    async (req: Request, res: Response) => {
      const validatedData = registerSchema.parse(req.body);

      const user =
        await RegistrationService.registerUser(
          validatedData
        );

      return res.status(201).json({
        success: true,
        message: "Registration successful",
        data: user,
      });
    }
  );
}
import { Request, Response } from "express";

import asyncHandler from "../../common/utils/asyncHandler";

import { AdminService } from "./admin.service";
import { assignTimeslotSchema } from "./admin.validation";

export class AdminController {
  static getRegistrations =
    asyncHandler(
      async (
        req: Request,
        res: Response
      ) => {
        const registrations =
          await AdminService.getRegistrations();

        return res.status(200).json({
          success: true,
          data: registrations,
        });
      }
    );

    static getAvailableTimeslots =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const slots =
        await AdminService.getAvailableTimeslots();

      return res.status(200).json({
        success: true,
        data: slots,
      });
    }
  );

static assignTimeslot =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const validatedData =
        assignTimeslotSchema.parse(
          req.body
        );

      const assignment =
        await AdminService.assignTimeslot(
          validatedData
        );

      return res.status(200).json({
        success: true,
        message:
          "Timeslot assigned successfully",
        data: assignment,
      });
    }
  );
}
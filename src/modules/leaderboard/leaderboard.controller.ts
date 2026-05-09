import { Request, Response } from "express";
import asyncHandler from "../../common/utils/asyncHandler";
import { setFinishTimeSchema } from "./leaderboard.validation";
import { LeaderboardService } from "./leaderboard.service";

export class LeaderboardController {
  static getLeaderboard = asyncHandler(
    async (req: Request, res: Response) => {
      const data = await LeaderboardService.getLeaderboard();
      return res.status(200).json({
        success: true,
        data,
      });
    }
  );

  static setFinishTime = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = setFinishTimeSchema.parse(req.body);

    const result = await LeaderboardService.setFinishTime({
      registrationId: validatedData.registrationId,
      finishTime: validatedData.finishTime,
    });

    return res.status(200).json({
      success: true,
      message: "Finish time saved",
      data: result,
    });
  });
}


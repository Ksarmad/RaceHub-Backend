import { Router } from "express";
import authMiddleware from "../../common/middleware/authMiddleware";
import { LeaderboardController } from "./leaderboard.controller";

const router = Router();

router.get("/public/leaderboard", LeaderboardController.getLeaderboard);

router.patch(
  "/admin/leaderboard/finish-time",
  authMiddleware,
  LeaderboardController.setFinishTime
);

export default router;


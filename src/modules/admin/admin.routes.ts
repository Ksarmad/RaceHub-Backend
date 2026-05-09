import { Router } from "express";

import { AdminController } from "./admin.controller";

import authMiddleware from "../../common/middleware/authMiddleware";

const router = Router();

router.get(
  "/admin/registrations",
  authMiddleware,
  AdminController.getRegistrations
);

router.get(
  "/admin/timeslots/available",
  authMiddleware,
  AdminController.getAvailableTimeslots
);

router.patch(
  "/admin/assign-timeslot",
  authMiddleware,
  AdminController.assignTimeslot
);

export default router;
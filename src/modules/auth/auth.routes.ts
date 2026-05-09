import { Router } from "express";

import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/admin/login",
  AuthController.login
);

export default router;
import { Router } from "express";
import { RegistrationController } from "./registration.controller";

const router = Router();

router.post(
  "/register",
  RegistrationController.register
);

export default router;
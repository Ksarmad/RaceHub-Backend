import prisma from "../../config/prisma";
import AppError from "../../common/errors/AppError";
import { RegisterInput } from "./registration.types";
import { MailService } from "../mail/mail.service";

export class RegistrationService {
  static async registerUser(data: RegisterInput) {
    const existingUser = await prisma.registration.findUnique({
      where: {
        phone: data.phone,
      },
    });

    if (existingUser) {
      throw new AppError("Phone number already registered", 409);
    }

    const user = await prisma.registration.create({
      data,
    });

    try {
      await MailService.sendRegistrationSuccessEmail({
        name: user.name,
        email: user.email,
      });

      await MailService.sendAdminNotificationEmail({
        name: user.name,
        phone: user.phone,
      });

      return user;
    } catch (error) {
      // Registration should fail if notifications cannot be sent in production
      // so frontend shows a real error instead of staying "pending".
      console.error("Email sending failed:", error);
      throw new AppError(
        "Registration created but notification email failed. Please try again later.",
        503
      );
    }
  }
}

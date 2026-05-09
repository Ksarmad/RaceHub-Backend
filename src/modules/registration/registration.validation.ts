import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email format"),

  phone: z
    .string()
    .regex(
      /^\+\d{10,15}$/,
      "Phone number must include country code"
    ),
});
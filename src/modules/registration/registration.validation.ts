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
    .regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),
});
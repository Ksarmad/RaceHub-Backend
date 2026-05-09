import { z } from "zod";

const envSchema = z.object({
  PORT: z.string(),

  DATABASE_URL: z.string(),

  JWT_SECRET: z.string(),

  NODE_ENV: z
    .enum(["development", "production"])
    .default("development"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.format()
  );

  process.exit(1);
}

export const env = parsedEnv.data;
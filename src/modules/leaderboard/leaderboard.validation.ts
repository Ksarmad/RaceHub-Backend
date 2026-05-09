import { z } from "zod";

export const setFinishTimeSchema = z.object({
  registrationId: z.string().min(1),
  finishTime: z.string().min(1),
});


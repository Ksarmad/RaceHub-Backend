import { z } from "zod";

export const assignTimeslotSchema =
  z.object({
    userId: z.string(),

    timeslotId: z.string(),
  });
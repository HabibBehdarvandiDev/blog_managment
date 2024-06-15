import { z } from "zod";

export const tagsSchema = z.object({
  tagName: z.string(),
});

import { z } from "zod";

export const tagsSchema = z.object({
  tag_name: z.string(),
});

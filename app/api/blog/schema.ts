import { z } from "zod";

export const blogSchema = z.object({
  title: z.string(),
  content: z.string(),
  author_id: z.number(),
  is_verified: z.boolean(),
  thumbnail_url: z.string(),
});

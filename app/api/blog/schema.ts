import { z } from "zod";

export const blogSchema = z.object({
  title: z.string(),
  content: z.string(),
  author_id: z.number(),
  thumbnail_url: z.string(),
});

export const blogSchemaPartial = blogSchema.partial();

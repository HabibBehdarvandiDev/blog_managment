import { z } from "zod";

export const blogSchema = z.object({
  title: z.string({ required_error: "نام نوشته نمی تواند خالی باشد." }),
  content: z.string({ required_error: "محتوای نوشته نمی تواند خالی باشد." }),
  author_id: z.number({ required_error: "آیدی نویسنده باید ارسال شود." }),
  thumbnail_url: z.string().optional(),
});

export const blogSchemaPartial = blogSchema.partial().merge(
  z.object({
    author_id: z.number().nonnegative().int(),
  })
);

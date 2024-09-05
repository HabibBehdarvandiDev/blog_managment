import { z } from "zod";

export const tagsSchema = z.object({
  tag_name: z.string({
    message: "نام برچسب باید شامل حروف باشد.",
    required_error: "نام برچسب یک فیلد اجباری است.",
  }),
});

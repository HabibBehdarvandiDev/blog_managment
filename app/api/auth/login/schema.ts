import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ required_error: "نام کاربری الزامی است!" })
    .min(8, "نام کاربری باید حداقل 8 کاراکتر باشد!")
    .max(20, "نام کاربری حداکثر باید 20 کاراکتر باشد!"),
  password: z
    .string({ required_error: "رمز عبور برای احراز هویت الزامی است!" })
    .min(8, "رمز عبور باید حداقل 8 کاراکتر داشته باشد!"),
});

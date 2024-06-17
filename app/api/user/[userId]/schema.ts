import { z } from "zod";

export const userSchema = z.object({
  first_name: z.string({
    required_error: "لطفا نام خود را وارد کنید.",
    invalid_type_error: "نام باید به صورت رشته‌ای از حروف باشد.",
  }),
  last_name: z.string({
    required_error: "لطفا نام خانوادگی خود را وارد کنید.",
    invalid_type_error: "نام خانوادگی باید به صورت رشته‌ای از حروف باشد.",
  }),
  nickname: z.string({
    invalid_type_error: "نام مستعار باید به صورت رشته‌ای از حروف باشد.",
  }).optional(),
  date_of_birth: z.date({
    invalid_type_error: "تاریخ تولد باید به صورت تاریخ معتبر باشد. مثال: 1370-01-01",
  }),
  profile_url: z.string({
    invalid_type_error: "لینک پروفایل باید یک URL معتبر باشد. مثال: https://example.com",
  }).optional(),
  username: z.string({
    required_error: "لطفا نام کاربری خود را وارد کنید.",
    invalid_type_error: "نام کاربری باید به صورت رشته‌ای از حروف باشد.",
  }),
  password: z.string({
    required_error: "لطفا رمز عبور خود را وارد کنید.",
    invalid_type_error: "رمز عبور باید به صورت رشته‌ای از حروف باشد.",
  }),
  phone_number: z.string({
    invalid_type_error: "شماره همراه و یا تلفن باید به صورت عددی باشد.",
  }).refine((val) => /^\+?98\d{10}$/.test(val), {
    message: "لطفا شماره تلفن معتبر ایران وارد کنید. مثال: 09306688810 یا +989306688810",
  }),
  active: z.boolean({
    required_error: "لطفا وضعیت حساب کاربری را مشخص کنید. مثال: True یا False",
    invalid_type_error: "وضعیت حساب کاربری باید به صورت True یا False باشد.",
  }),
  role_id: z.number({
    required_error: "لطفا آیدی دسترسی خود را وارد کنید.",
    invalid_type_error: "آیدی دسترسی باید به صورت عددی باشد.",
  }),
});

export const userSchemaPartial = userSchema.partial();

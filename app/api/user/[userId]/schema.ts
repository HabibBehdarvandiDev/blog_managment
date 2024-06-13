import { z } from "zod";

export const userSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  date_of_birth: z.date(),
  profile_url: z.string(),
  username: z.string(),
  password: z.string(),
  phone_number: z.string().max(11),
  active: z.boolean(),
  role_id: z.number(),
});

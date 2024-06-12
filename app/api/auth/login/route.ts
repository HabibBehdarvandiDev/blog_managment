import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { loginSchema } from "./schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "بدنه درخواست نمی تواند خالی باشد!" },
      { status: 400 }
    );
  }

  const validation = loginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.formErrors, { status: 400 });
  }

  const { username, password } = validation.data;

  const isUserExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!isUserExist) {
    return NextResponse.json(
      { error: "نام کاربری وارد شده وجود ندارد!" },
      { status: 404 }
    );
  }

  const isPasswordmatch = await bcrypt.compareSync(
    password,
    isUserExist.password
  );

  if (!isPasswordmatch) {
    return NextResponse.json(
      { error: "نام کاربری یا رمز عبور اشتباه است!" },
      { status: 400 }
    );
  }

  const payload = {
    id: isUserExist.id,
    userRoleId: isUserExist.role_id,
    username: isUserExist.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return NextResponse.json(
    {
      message: "احراز هویت موفقیت آمیز بود!",
      token: token,
    },
    { status: 200 }
  );
}

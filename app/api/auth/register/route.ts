import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "./schema";
import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import { createJWT } from "@/lib/session";
import { createSession } from "@/lib/cookies";

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

  const validation = registerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.formErrors, { status: 400 });
  }

  const { first_name, last_name, password, username } = validation.data;

  const isUserExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (isUserExist) {
    return NextResponse.json(
      {
        error:
          "نام کاربری وارد شده قبلا انتخاب شده است، لطفا نام دیگری انتخاب کنید!",
      },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.BCRYPT_SALT!)
  );

  const newUser = await prisma.user.create({
    data: {
      first_name: first_name,
      last_name: last_name,
      username: username.toLowerCase(),
      password: hashedPassword,
      role_id: 2,
    },
  });

  await createSession(newUser.id);

  const userRole = await prisma.role.findUnique({
    where: {
      id: newUser.role_id,
    },
  });

  const token = await createJWT(
    { userId: newUser.id, role: userRole?.role_name },
    "2h"
  );

  return NextResponse.json(
    { message: "ثبت نام شما تکمیل شد.", newUser: newUser, token },
    { status: 200 }
  );
}

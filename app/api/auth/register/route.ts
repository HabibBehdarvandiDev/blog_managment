import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "./schema";
import prisma from "@/utils/db";

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

  
}

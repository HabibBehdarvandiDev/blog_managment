import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "./schema";

export async function GET(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  const { params } = context;
  let userId;

  try {
    userId = parseInt(params.userId);

    // Check if userId is a valid number and a positive integer
    if (isNaN(userId) || userId <= 0) {
      return NextResponse.json(
        { error: "لطفا آیدی معتبر وارد کنید!" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "لطفا آیدی معتبر وارد کنید!" },
      { status: 400 }
    );
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    return NextResponse.json(
      { error: `کاربر مورد نظر با آیدی ${userId} پیدا نشد!` },
      { status: 404 }
    );
  }

  return NextResponse.json(isUserExist, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  const { params } = context;
  let userId;

  try {
    userId = parseInt(params.userId);

    // Check if userId is a valid number and a positive integer
    if (isNaN(userId) || userId <= 0) {
      return NextResponse.json(
        { error: "لطفا آیدی معتبر وارد کنید!" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "لطفا آیدی معتبر وارد کنید!" },
      { status: 400 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "بدنه درخواست نمی تواند خالی باشد!" },
      { status: 400 }
    );
  }

  const partialSchema = userSchema.partial();

  const validation = partialSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.formErrors, { status: 400 });
  }

  const updateData = validation.data;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    return NextResponse.json(
      { error: `کاربر مورد نظر با آیدی ${userId} پیدا نشد!` },
      { status: 404 }
    );
  }

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    return NextResponse.json(
      { message: "اطلاعات کاربر با موفقیت به روز شد!", updateUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "فرآیند به‌روزرسانی با مشکل مواجه شده!" },
      { status: 500 }
    );
  }
}

export async function DELETE(context: { params: { userId: string } }) {
  const { params } = context;
  let userId;

  try {
    userId = parseInt(params.userId);

    // Check if userId is a valid number and a positive integer
    if (isNaN(userId) || userId <= 0) {
      return NextResponse.json(
        { error: "لطفا آیدی معتبر وارد کنید!" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "لطفا آیدی معتبر وارد کنید!" },
      { status: 400 }
    );
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    return NextResponse.json(
      { error: `کاربر مورد نظر با آیدی ${userId} پیدا نشد!` },
      { status: 404 }
    );
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(
      { message: "اکانت کاربر حذف شد!", deletedUser: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "فرآیند حذف با مشکل مواجه شده!" },
      { status: 500 }
    );
  }
}

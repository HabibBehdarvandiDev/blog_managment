import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let username;
  try {
    username = req.nextUrl.searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "نام کاربری نا معتبر!" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "درخواست نامعتبر لطفا درخواست خود را چک کنید!",
      },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "کاربر پیدا نشد!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "مشکلی هنمگام ارتباط با دیتابیس به وجود آمد، لطفا با پشتیبانی تماس بگیرید.",
      },
      { status: 500 }
    );
  }
}

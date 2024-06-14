import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET(req: NextRequest) {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "مشکلی هنگام ارتباط با دیتابیس به وجود آمده! لطفا با پشتیبانی تماس بگیرید.",
      },
      { status: 500 }
    );
  }
}
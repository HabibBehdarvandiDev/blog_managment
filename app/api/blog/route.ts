import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { blogSchema } from "./schema";

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

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        error: "بدنه درخواست نمی تواند خالی باشد!",
      },
      { status: 400 }
    );
  }

  const validation = blogSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.formErrors, { status: 400 });
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: validation.data.author_id,
    },
  });

  if (!isUserExist) {
    return NextResponse.json(
      {
        error: "شما مجاز به ایجاد نوشته نیستید!",
      },
      { status: 403 }
    );
  }

  const isUserActive = isUserExist.active === true;

  if (!isUserActive) {
    return NextResponse.json(
      {
        error: "حساب کاربری شما هنوز تایید نشده لطفا بعدا دوباره تلاش کنید!",
      },
      { status: 403 }
    );
  }

  try {
    const isTitleUnique = await prisma.blog.findUnique({
      where: {
        title: validation.data.title,
      },
    });

    isTitleUnique &&
      NextResponse.json(
        {
          error: "نوشته با این نام از قبل وجود دارد.",
        },
        { status: 400 }
      );
  } catch (error) {
    return NextResponse.json(
      {
        error: "مشکلی هنگام ارتباط با دیتابیس به وجود آمد",
      },
      { status: 400 }
    );
  }

  const data = validation.data;

  try {
    const newBlog = await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        author_id: data.author_id,
        thumbnail_url: data.thumbnail_url,
      },
    });

    return NextResponse.json(
      {
        message: "نوشته با موفقیت ایجاد شد.",
        newBlog: newBlog,
      },
      { status: 201 }
    );
  } catch (error) {}
}

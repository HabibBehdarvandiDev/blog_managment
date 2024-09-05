import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { requestToBodyStream } from "next/dist/server/body-streams";
import { blogSchemaPartial } from "../schema";

export async function GET(
  req: NextRequest,
  context: { params: { blogId: string } }
) {
  const { params } = context;
  let blogId: number;

  blogId = parseInt(params.blogId);

  if (isNaN(blogId) || blogId <= 0) {
    return NextResponse.json(
      { error: "لطفا آیدی معتبر وارد کنید!" },
      { status: 400 }
    );
  }

  const isBlogExist = await prisma.blog.findUnique({ where: { id: blogId } });

  if (!isBlogExist) {
    return NextResponse.json(
      {
        error: `وبلاگ با آیدی ${blogId} پیدا نشد!`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json(isBlogExist, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  context: { params: { blogId: string } }
) {
  const { params } = context;
  let blogId: number;

  blogId = parseInt(params.blogId);

  if (isNaN(blogId) || blogId <= 0) {
    return NextResponse.json(
      { error: "لطفا آیدی معتبر وارد کنید!" },
      { status: 400 }
    );
  }

  const isBlogExist = await prisma.blog.findUnique({ where: { id: blogId } });

  if (!isBlogExist) {
    return NextResponse.json(
      {
        error: `نوشته با آیدی ${blogId} پیدا نشد!`,
      },
      { status: 404 }
    );
  }

  try {
    const deletedBlog = await prisma.blog.delete({ where: { id: blogId } });

    return NextResponse.json(
      {
        message: "نوشته مورد نظر حذف شد",
        deletedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "مشکلی هنگام ارتباط با دیتابیس به وجود آمده، لطفا با پشتیبانی تماس بگیرید.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { blogId: string } }
) {
  const { params } = context;
  let blogId: number;

  blogId = parseInt(params.blogId);

  if (isNaN(blogId) || blogId <= 0) {
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
      {
        error: "بدنه درخواست نمی تواند خالی باشد!",
      },
      { status: 400 }
    );
  }

  const validation = blogSchemaPartial.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.formErrors, { status: 400 });
  }

  if (!validation.data.author_id) {
    return NextResponse.json(
      {
        error: "آیدی نویسنده در بدنه درخواست الزامی است",
      },
      { status: 400 }
    );
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

  const isBlogExist = await prisma.blog.findUnique({ where: { id: blogId } });

  if (!isBlogExist) {
    return NextResponse.json(
      {
        error: `نوشته با آیدی ${blogId} پیدا نشد!`,
      },
      { status: 404 }
    );
  }

  try {
    const updatedBlog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: validation.data,
    });

    return NextResponse.json(
      {
        message: "نوشته با موفقیت بروز رسانی شد.",
        updatedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "مشکلی هنگام بروز رسانی و ارتباط با دیتابیس به وجود آمده، لطفا با پشتیبانی تماس بگیرید.",
      },
      { status: 500 }
    );
  }
}

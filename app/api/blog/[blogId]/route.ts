import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { requestToBodyStream } from "next/dist/server/body-streams";

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

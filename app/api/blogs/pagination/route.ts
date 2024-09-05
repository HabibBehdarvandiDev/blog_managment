import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET(req: NextRequest) {
  let paginationPage, blogsAmount;
  try {
    paginationPage = req.nextUrl.searchParams.get("pagination");
    paginationPage = paginationPage ? parseInt(paginationPage) : 1;

    blogsAmount = req.nextUrl.searchParams.get("amount");
    blogsAmount = blogsAmount ? parseInt(blogsAmount) : 7;
  } catch (error) {
    return NextResponse.json(
      {
        error: "درخواست نامعتبر لطفا درخواست خود را چک کنید!",
      },
      { status: 400 }
    );
  }

  const skip = (paginationPage - 1) * blogsAmount;

  try {
    const blogs = await prisma.blog.findMany({
      skip: skip,
      take: blogsAmount,
      orderBy: {
        created_at: "desc",
      },
    });

    if (blogs.length <= 0) {
      return NextResponse.json(
        {
          error: "وبلاگی در این صفحه وجود ندارد",
        },
        { status: 400 }
      );
    }

    const totalBlogs = await prisma.blog.count();

    const totalPages = Math.ceil(totalBlogs / blogsAmount);

    return NextResponse.json(
      {
        pagination: paginationPage,
        amount: blogsAmount,
        totalPages: totalPages,
        totalBlogs: totalBlogs,
        blogs: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "مشکلی هنگام ارتباط با دیتابیس به وجود آمده! لطفا با پشتیبانی تماس بگیرید.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    pagination: paginationPage,
    amount: blogsAmount,
  });
}

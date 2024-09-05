import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { tagsSchema } from "./schema";

export async function GET(req: NextRequest) {
  try {
    const tags = await prisma.tags.findMany();

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "مشکلی هنگام ارتباط با دیتابیس به وجود آمد، لطفا با پشتیبانی تماس بگیرید",
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

  const validation = tagsSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.formErrors);
  }

  const isTagExist = await prisma.tags.findUnique({
    where: {
      tag_name: validation.data.tag_name,
    },
  });

  if (isTagExist) {
    return NextResponse.json(
      {
        error: "برچسب وجود دارد",
      },
      { status: 400 }
    );
  }

  try {
    const newTag = await prisma.tags.create({
      data: {
        tag_name: validation.data.tag_name,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "برچسب با موفقیت ساخته شد",
        newTag,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "مشکلی هنگام اتصال به دیتابیس به وجود آمد، لطفا با پشتیبانی تماس بگیرید",
      },
      { status: 500 }
    );
  }
}

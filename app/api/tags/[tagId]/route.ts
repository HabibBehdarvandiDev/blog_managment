import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { tagsSchema } from "../schema";

export async function GET(
  req: NextRequest,
  context: { params: { tagId: string } }
) {
  const { params } = context;
  let id: number;

  id = parseInt(params.tagId);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json(
      { error: "لطفا آیدی معتبر وارد کنید!" },
      { status: 400 }
    );
  }

  try {
    const tag = await prisma.tags.findUnique({
      where: {
        id: id,
      },
    });

    !tag &&
      NextResponse.json(
        {
          error: "برچسب مورد نظر وجود ندارد!",
        },
        { status: 404 }
      );

    return NextResponse.json(tag, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "مشکلی هنگام ارتباط با دیتابیس به وجود آمده، لطفا با پشتیبانی تماس بگیرید!",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { tagId: string } }
) {
  const { tagId } = context.params;
  const id = parseInt(tagId);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json(
      { error: "لطفا آیدی معتبر وارد کنید!" },
      { status: 400 }
    );
  }

  let tag;
  try {
    tag = await prisma.tags.findUnique({ where: { id: id } });
    if (!tag) {
      return NextResponse.json(
        { error: "برچسب مورد نظر پیدا نشد!" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "مشکلی هنگام ارتباط با دیتابیس به وجود آمده، لطفا با پشتیبانی تماس بگیرید!",
      },
      { status: 500 }
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

  const validation = tagsSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.formErrors },
      { status: 400 }
    );
  }

  const { tag_name } = validation.data;

  if (!tag_name) {
    return NextResponse.json(
      { error: "برای برورسانی باید نام برچسب ارسال شود." },
      { status: 400 }
    );
  }

  const tagNameExist = await prisma.tags.findUnique({
    where: { tag_name: tag_name },
  });

  if (tagNameExist) {
    return NextResponse.json(
      { error: "این برچسب قبلا ایجاد شده!" },
      { status: 400 }
    );
  }

  try {
    const updatedTag = await prisma.tags.update({
      where: { id: id },
      data: validation.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "برچسب با موفقیت بروزرسانی شد.",
        updatedTag,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "مشکلی هنگام ساختن برچسب به وجود آمد، لطفا با پشتیبانی تماس بگیرید!",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { tagId: string } }
) {
  const { tagId } = context.params;
  const id = parseInt(tagId);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json(
      { error: "لطفا آیدی معتبر وارد کنید!" },
      { status: 400 }
    );
  }

  let tag;
  try {
    tag = await prisma.tags.findUnique({ where: { id: id } });
    if (!tag) {
      return NextResponse.json(
        { error: "برچسب مورد نظر پیدا نشد!" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "مشکلی هنگام ارتباط با دیتابیس به وجود آمده، لطفا با پشتیبانی تماس بگیرید!",
      },
      { status: 500 }
    );
  }

  try {
    const deltedtag = await prisma.tags.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "برچسب با موفقیت حذف شد.",
        deltedtag,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "مشکلی هنگام حذف کردن برچسب به وجود آمد، لطفا با پشتیبانی تماس بگیرید.!",
      },
      { status: 500 }
    );
  }
}

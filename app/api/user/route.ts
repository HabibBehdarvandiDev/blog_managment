import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    return NextResponse.json(
      { error: "هیچ کاربری هنوز وجود ندارد!" },
      { status: 404 }
    );
  }

  return NextResponse.json(users, { status: 200 });
}

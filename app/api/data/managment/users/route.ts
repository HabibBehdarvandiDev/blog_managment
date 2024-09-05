import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Get page and limit from query parameters (default to page 1 and 10 users per page)
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  // Calculate the offset
  const offset = (page - 1) * limit;

  try {
    // Get the total count of users
    const totalUsers = await prisma.user.count();

    // Fetch the users with pagination and detailed selection
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        username: true,
        active: true,
        role: {
          select: {
            role_name: true,
          },
        },
        userwallet: {
          select: {
            balance: true,
          },
        },
        _count: {
          select: {
            blog: true,
          },
        },
      },
    });

    // If no users found, return a 404 error
    if (users.length === 0) {
      return NextResponse.json(
        { error: "هیچ کاربری هنوز وجود ندارد!" },
        { status: 404 }
      );
    }

    // Return users with pagination info
    return NextResponse.json(
      {
        results: users,
        total: totalUsers,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در بازیابی کاربران رخ داد!" },
      { status: 500 }
    );
  }
}

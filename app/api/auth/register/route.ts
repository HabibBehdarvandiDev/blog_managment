import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "بدنه درخواست نمی تواند خالی باشد!" });
  }

  
}

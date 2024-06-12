import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "./schema";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "بدنه درخواست نمی تواند خالی باشد!" });
  }

  const validation = registerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.formErrors);
  }

  const { first_name, last_name, password, username } = validation.data;
}

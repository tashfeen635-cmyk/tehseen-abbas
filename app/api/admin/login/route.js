import { NextResponse } from "next/server";
import { verifyAdmin, createSession } from "../../../../lib/auth";

export async function POST(req) {
  const { username, password } = await req.json();
  if (!verifyAdmin(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { getSetting } from "../../../../lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({
    authenticated: authed,
    username: authed ? getSetting("adminUsername") || "admin" : null,
  });
}

import { NextResponse } from "next/server";
import {
  isAuthenticated,
  setAdminPassword,
  setAdminUsername,
  verifyAdmin,
} from "../../../../lib/auth";
import { getSiteSettings, setSetting } from "../../../../lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getSiteSettings());
}

export async function PUT(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { values, changePassword, changeUsername } = body;
  if (values && typeof values === "object") {
    for (const [k, v] of Object.entries(values)) {
      await setSetting(k, v);
    }
  }
  if (changeUsername !== undefined) {
    const name = String(changeUsername).trim();
    if (!name) {
      return NextResponse.json({ error: "Username required" }, { status: 400 });
    }
    await setAdminUsername(name);
  }
  if (changePassword && changePassword.newPassword) {
    if (!changePassword.currentPassword) {
      return NextResponse.json({ error: "Current password required" }, { status: 400 });
    }
    const user = (await getSiteSettings()).adminUsername || "admin";
    if (!(await verifyAdmin(user, changePassword.currentPassword))) {
      return NextResponse.json({ error: "Current password incorrect" }, { status: 401 });
    }
    await setAdminPassword(changePassword.newPassword);
  }
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { isAuthenticated, setAdminPassword } from "../../../../lib/auth";
import { getSiteSettings, setSetting } from "../../../../lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getSiteSettings());
}

export async function PUT(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { values, changePassword } = body;
  if (values && typeof values === "object") {
    for (const [k, v] of Object.entries(values)) {
      setSetting(k, v);
    }
  }
  if (changePassword && changePassword.newPassword) {
    if (!changePassword.currentPassword) {
      return NextResponse.json({ error: "Current password required" }, { status: 400 });
    }
    const { verifyAdmin } = await import("../../../../lib/auth");
    const user = getSiteSettings().adminUsername || "admin";
    if (!verifyAdmin(user, changePassword.currentPassword)) {
      return NextResponse.json({ error: "Current password incorrect" }, { status: 401 });
    }
    setAdminPassword(changePassword.newPassword);
  }
  return NextResponse.json({ ok: true });
}

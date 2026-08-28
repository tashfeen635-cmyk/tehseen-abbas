import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { db } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(db.prepare("SELECT * FROM skills ORDER BY id ASC").all());
}

export async function POST(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const info = db
    .prepare("INSERT INTO skills (icon, name, target) VALUES (?, ?, ?)")
    .run(body.icon || "", body.name || "", Number(body.target) || 0);
  return NextResponse.json({ id: info.lastInsertRowid });
}

export async function PUT(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  db.prepare("UPDATE skills SET icon = ?, name = ?, target = ? WHERE id = ?")
    .run(body.icon, body.name, Number(body.target) || 0, body.id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  db.prepare("DELETE FROM skills WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}

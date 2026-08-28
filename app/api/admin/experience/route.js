import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { sql } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const res = await sql`SELECT * FROM experience ORDER BY id ASC`;
  return NextResponse.json(res.rows);
}

export async function POST(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const res = await sql`
    INSERT INTO experience (icon, title, description, date, color)
    VALUES (${body.icon || ""}, ${body.title || ""}, ${body.description || ""}, ${body.date || ""}, ${body.color || "cyan"})
    RETURNING id
  `;
  return NextResponse.json({ id: res.rows[0].id });
}

export async function PUT(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await sql`
    UPDATE experience SET icon = ${body.icon}, title = ${body.title}, description = ${body.description},
    date = ${body.date}, color = ${body.color} WHERE id = ${body.id}
  `;
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await sql`DELETE FROM experience WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}

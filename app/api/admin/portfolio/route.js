import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { db } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = db
    .prepare("SELECT * FROM portfolio_items ORDER BY sort_order ASC, id ASC")
    .all();
  return NextResponse.json(items);
}

export async function POST(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { src, category } = await req.json();
  if (!src || !category) {
    return NextResponse.json({ error: "src and category required" }, { status: 400 });
  }
  const maxOrder = db.prepare("SELECT COALESCE(MAX(sort_order), -1) AS m FROM portfolio_items").get().m;
  const info = db
    .prepare("INSERT INTO portfolio_items (src, category, sort_order) VALUES (?, ?, ?)")
    .run(src, category, maxOrder + 1);
  return NextResponse.json({ id: info.lastInsertRowid });
}

export async function PUT(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, src, category, sortOrder } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  db.prepare(
    "UPDATE portfolio_items SET src = COALESCE(?, src), category = COALESCE(?, category), sort_order = COALESCE(?, sort_order) WHERE id = ?"
  ).run(src ?? null, category ?? null, sortOrder ?? null, id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  db.prepare("DELETE FROM portfolio_items WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}

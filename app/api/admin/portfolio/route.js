import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { sql, initDb } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const res = await sql`
    SELECT id, src, category, sort_order AS "sortOrder"
    FROM portfolio_items ORDER BY sort_order ASC, id ASC
  `;
  return NextResponse.json(res.rows);
}

export async function POST(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { src, category } = await req.json();
  if (!src || !category) {
    return NextResponse.json({ error: "src and category required" }, { status: 400 });
  }
  await initDb();
  const maxRes = await sql`SELECT COALESCE(MAX(sort_order), -1) AS m FROM portfolio_items`;
  const maxOrder = Number(maxRes.rows[0]?.m ?? -1);
  const res = await sql`
    INSERT INTO portfolio_items (src, category, sort_order)
    VALUES (${src}, ${category}, ${maxOrder + 1})
    RETURNING id
  `;
  return NextResponse.json({ id: res.rows[0].id });
}

export async function PUT(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, src, category, sortOrder } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await sql`
    UPDATE portfolio_items
    SET src = COALESCE(${src ?? null}, src),
        category = COALESCE(${category ?? null}, category),
        sort_order = COALESCE(${sortOrder ?? null}, sort_order)
    WHERE id = ${id}
  `;
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await sql`DELETE FROM portfolio_items WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}

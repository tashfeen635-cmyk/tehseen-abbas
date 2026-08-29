import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { initDb } from "../../../../lib/db.mjs";
import { Experience } from "../../../../lib/models.mjs";

export const dynamic = "force-dynamic";

function toJson(doc) {
  const { _id, __v, createdAt, updatedAt, ...rest } = doc.toObject();
  return { id: String(_id), ...rest };
}

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await initDb();
  const docs = await Experience.find().sort({ _id: 1 });
  return NextResponse.json(docs.map(toJson));
}

export async function POST(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  await initDb();
  const doc = await Experience.create({
    icon: body.icon || "",
    title: body.title || "",
    description: body.description || "",
    date: body.date || "",
    color: body.color || "cyan",
  });
  return NextResponse.json({ id: String(doc._id) });
}

export async function PUT(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await initDb();
  await Experience.updateOne(
    { _id: body.id },
    {
      $set: {
        icon: body.icon,
        title: body.title,
        description: body.description,
        date: body.date,
        color: body.color,
      },
    }
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await initDb();
  await Experience.deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}

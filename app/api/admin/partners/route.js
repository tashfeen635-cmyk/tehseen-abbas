import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { initDb } from "../../../../lib/db.mjs";
import { Partner } from "../../../../lib/models.mjs";

export const dynamic = "force-dynamic";

function toJson(doc) {
  const d = doc.toObject ? doc.toObject() : doc;
  const { _id, __v, createdAt, updatedAt, ...rest } = d;
  return { id: String(_id), ...rest };
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await initDb();
  const docs = await Partner.find().sort({ sortOrder: 1, _id: 1 });
  return NextResponse.json(docs.map(toJson));
}

export async function POST(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { src, name = "" } = await req.json();
  if (!src) {
    return NextResponse.json({ error: "src required" }, { status: 400 });
  }
  await initDb();
  const maxDoc = await Partner.findOne().sort({ sortOrder: -1 }).select("sortOrder");
  const maxOrder = maxDoc?.sortOrder ?? -1;
  const doc = await Partner.create({ src, name, sortOrder: maxOrder + 1 });
  return NextResponse.json({ id: String(doc._id) });
}

export async function PUT(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, src, name, sortOrder } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await initDb();
  const set = {};
  if (src !== undefined) set.src = src;
  if (name !== undefined) set.name = name;
  if (sortOrder !== undefined) set.sortOrder = sortOrder;
  await Partner.updateOne({ _id: id }, { $set: set });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await initDb();
  await Partner.deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}
import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { initDb } from "../../../../lib/db.mjs";
import { Testimonial } from "../../../../lib/models.mjs";

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
  const docs = await Testimonial.find().sort({ sortOrder: 1, _id: 1 });
  return NextResponse.json(docs.map(toJson));
}

export async function POST(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { text = "", name = "", role = "", avatar = "", approved = true } = await req.json();
  await initDb();
  const maxDoc = await Testimonial.findOne().sort({ sortOrder: -1 }).select("sortOrder");
  const maxOrder = maxDoc?.sortOrder ?? -1;
  const doc = await Testimonial.create({ text, name, role, avatar, approved, sortOrder: maxOrder + 1 });
  return NextResponse.json({ id: String(doc._id) });
}

export async function PUT(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, text, name, role, avatar, approved, sortOrder } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await initDb();
  const set = {};
  if (text !== undefined) set.text = text;
  if (name !== undefined) set.name = name;
  if (role !== undefined) set.role = role;
  if (avatar !== undefined) set.avatar = avatar;
  if (approved !== undefined) set.approved = approved;
  if (sortOrder !== undefined) set.sortOrder = sortOrder;
  await Testimonial.updateOne({ _id: id }, { $set: set });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await initDb();
  await Testimonial.deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}
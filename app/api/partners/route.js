import { NextResponse } from "next/server";
import { initDb } from "../../../lib/db.mjs";
import { Partner } from "../../../lib/models.mjs";

export const dynamic = "force-dynamic";

function toJson(doc) {
  const d = doc.toObject ? doc.toObject() : doc;
  const { _id, __v, ...rest } = d;
  return { id: String(_id), ...rest };
}

export async function GET() {
  await initDb();
  const docs = await Partner.find().sort({ sortOrder: 1, _id: 1 });
  return NextResponse.json(docs.map(toJson));
}
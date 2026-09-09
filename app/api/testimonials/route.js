import { NextResponse } from "next/server";
import { initDb } from "../../../lib/db.mjs";
import { Testimonial } from "../../../lib/models.mjs";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { text = "", name = "", role = "", avatar = "" } = await req.json();
    const cleanName = String(name).trim();
    const cleanText = String(text).trim();
    if (!cleanName || !cleanText) {
      return NextResponse.json({ error: "Name and review are required" }, { status: 400 });
    }
    await initDb();
    const maxDoc = await Testimonial.findOne().sort({ sortOrder: -1 }).select("sortOrder");
    const maxOrder = maxDoc?.sortOrder ?? -1;
    await Testimonial.create({
      text: cleanText,
      name: cleanName,
      role: String(role).trim(),
      avatar: String(avatar).trim() || "/images/default-avatar.svg",
      approved: false,
      sortOrder: maxOrder + 1,
    });
    return NextResponse.json({ ok: true, message: "Thank you! Your review has been submitted and will appear after review." });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
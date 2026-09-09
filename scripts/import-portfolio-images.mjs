import { connectDb } from "../lib/db.mjs";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SRC_ROOT = path.join(ROOT, "All-Images");
const DEST_ROOT = path.join(ROOT, "public", "images");

const CATEGORY_MAP = [
  { srcDir: "AWARDS PRESENTED", destDir: "AWARDS PRESENTED", category: "awardsPresented" },
  { srcDir: "AWARDS RECEIVED", destDir: "AWARDS RECEIVED", category: "awardsReceived" },
  { srcDir: "DISTINGUISHED PERSONALITIES", destDir: "DISTINGUISHED PERSONALITIES", category: "distinguished" },
  { srcDir: "Personal", destDir: "Personal", category: "personal" },
  { srcDir: "Sports", destDir: "Sports", category: "sports" },
  { srcDir: "Team", destDir: "TEAM", category: "team" },
];

function stripDupMarker(name) {
  return name.replace(/^(.*)\(\d+\)(\.[^.]+)$/, "$1$2");
}

function pickFiles(srcDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);
  const byBase = new Map();
  for (const name of files) {
    const base = stripDupMarker(name);
    const size = fs.statSync(path.join(srcDir, name)).size;
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base).push({ name, size });
  }
  const picked = [];
  for (const group of byBase.values()) {
    const exact = group.find((f) => f.name === stripDupMarker(f.name));
    if (!exact) {
      picked.push(...group.map((f) => f.name));
    } else {
      picked.push(exact.name);
      for (const f of group) {
        if (f.size !== exact.size) picked.push(f.name);
      }
    }
  }
  return picked;
}

function srcUrl(destDir, fileName) {
  const encoded = destDir
    .split(path.sep)
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `/images/${encoded}/${fileName}`;
}

await connectDb();
const { PortfolioItem } = await import("../lib/models.mjs");

const existing = await PortfolioItem.find().select("src").lean();
const existingSrcs = new Set(existing.map((d) => d.src));

const maxDoc = await PortfolioItem.findOne()
  .sort({ sortOrder: -1 })
  .select("sortOrder");
let sortOrder = maxDoc?.sortOrder ?? -1;

let copied = 0;
let inserted = 0;
let skipped = 0;

for (const { srcDir, destDir, category } of CATEGORY_MAP) {
  const srcPath = path.join(SRC_ROOT, srcDir);
  if (!fs.existsSync(srcPath)) continue;
  const destPath = path.join(DEST_ROOT, destDir);
  fs.mkdirSync(destPath, { recursive: true });

  for (const fileName of pickFiles(srcPath)) {
    const sourceFile = path.join(srcPath, fileName);
    const destFile = path.join(destPath, fileName);
    if (!fs.existsSync(destFile)) {
      fs.copyFileSync(sourceFile, destFile);
      copied++;
    }

    const src = srcUrl(destDir, fileName);
    if (existingSrcs.has(src)) {
      skipped++;
      continue;
    }
    await PortfolioItem.create({ src, category, description: "", sortOrder: ++sortOrder });
    inserted++;
  }
}

console.log(`Copied ${copied} file(s), inserted ${inserted} portfolio item(s), skipped ${skipped} existing.`);
process.exit(0);
import { connectDb } from "../lib/db.mjs";
import bcrypt from "bcryptjs";

const password = process.argv[2] || "admin";
const username = process.argv[3] || "admin";
const hash = bcrypt.hashSync(password, 10);

await connectDb();
const { SiteSetting } = await import("../lib/models.mjs");

await SiteSetting.updateOne(
  { key: "adminPasswordHash" },
  { $set: { value: hash } },
  { upsert: true }
);
await SiteSetting.updateOne(
  { key: "adminUsername" },
  { $set: { value: username } },
  { upsert: true }
);

console.log(`Admin credentials set: username="${username}" password="${password}"`);

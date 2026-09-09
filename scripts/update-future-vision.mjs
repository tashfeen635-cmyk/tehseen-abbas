import { connectDb } from "../lib/db.mjs";
import { AWARDS } from "../lib/defaults.mjs";

await connectDb();
const { Award } = await import("../lib/models.mjs");

await Award.deleteMany({});
await Award.insertMany(AWARDS);

console.log(`Future Vision content updated: ${AWARDS.length} items`);
process.exit(0);
import { connectDb } from "../lib/db.mjs";
import { EXPERIENCE } from "../lib/defaults.mjs";

await connectDb();
const { Experience } = await import("../lib/models.mjs");

await Experience.deleteMany({});
await Experience.insertMany(EXPERIENCE);

console.log(`Mission & Vision content updated: ${EXPERIENCE.length} items`);
process.exit(0);
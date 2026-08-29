import { connectDb } from "./lib/db.mjs";
import { seedDb } from "./lib/defaults.mjs";

await connectDb();
await seedDb();
console.log("Database seeded successfully against MongoDB.");

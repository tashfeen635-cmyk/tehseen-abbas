import { connectDb } from "../lib/db.mjs";

await connectDb();
const { PortfolioItem } = await import("../lib/models.mjs");

const result = await PortfolioItem.updateMany(
  {},
  { $set: { description: "chairman binary hub Tahseen-Abbas" } }
);

console.log(`Updated ${result.modifiedCount} portfolio images`);
process.exit(0);
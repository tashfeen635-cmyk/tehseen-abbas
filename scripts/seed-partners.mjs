import { connectDb } from "../lib/db.mjs";

await connectDb();
const { Partner } = await import("../lib/models.mjs");

const logos = [
  { src: "/images/partners/gb-government.jpg", name: "Government of Gilgit-Baltistan" },
  { src: "/images/partners/partner-images.jpg", name: "Partner" },
  { src: "/images/partners/partner-channels4.jpg", name: "Partner channel" },
  { src: "/images/partners/partner-images.png", name: "Partner" },
];

const count = await Partner.countDocuments();
if (count === 0) {
  await Partner.insertMany(logos.map((l, i) => ({ ...l, sortOrder: i })));
  console.log(`Seeded ${logos.length} partner logos`);
} else {
  console.log(`Partners already exist (${count}) - skipped`);
}
process.exit(0);
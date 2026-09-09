import { connectDb } from "../lib/db.mjs";
import { COMMUNITY, TESTIMONIALS } from "../lib/defaults.mjs";

await connectDb();
const { Community, Testimonial } = await import("../lib/models.mjs");

const communityCount = await Community.countDocuments();
if (communityCount === 0) {
  await Community.insertMany(COMMUNITY.map((c, i) => ({ ...c, sortOrder: i })));
  console.log(`Seeded ${COMMUNITY.length} community initiatives`);
} else {
  console.log(`Community already has ${communityCount} items - skipped`);
}

const testimonialCount = await Testimonial.countDocuments();
if (testimonialCount === 0) {
  await Testimonial.insertMany(TESTIMONIALS.map((t, i) => ({ ...t, sortOrder: i })));
  console.log(`Seeded ${TESTIMONIALS.length} testimonials`);
} else {
  console.log(`Testimonials already has ${testimonialCount} items - skipped`);
}

process.exit(0);
import { initDb, isSeeded, connectDb } from "./db.mjs";

async function models() {
  await connectDb();
  return import("./models.mjs");
}

function docJson(doc) {
  const d = doc.toObject ? doc.toObject() : doc;
  const { _id, __v, createdAt, updatedAt, ...rest } = d;
  return { id: String(_id), ...rest };
}

export async function getPortfolioItems() {
  const { PortfolioItem } = await models();
  const docs = await PortfolioItem.find().sort({ sortOrder: 1, _id: 1 }).lean();
  return docs.map((d) => {
    const { _id, __v, ...rest } = d;
    return { id: String(_id), ...rest };
  });
}

export async function getExperience() {
  const { Experience } = await models();
  const docs = await Experience.find().sort({ _id: 1 }).lean();
  return docs.map(docJson);
}

export async function getSkills() {
  const { Skill } = await models();
  const docs = await Skill.find().sort({ _id: 1 }).lean();
  return docs.map(docJson);
}

export async function getAwards() {
  const { Award } = await models();
  const docs = await Award.find().sort({ _id: 1 }).lean();
  return docs.map(docJson);
}

export async function getPartners() {
  const { Partner } = await models();
  const docs = await Partner.find().sort({ sortOrder: 1, _id: 1 }).lean();
  return docs.map(docJson);
}

export async function getCommunities() {
  const { Community } = await models();
  const docs = await Community.find().sort({ sortOrder: 1, _id: 1 }).lean();
  return docs.map(docJson);
}

export async function getTestimonials() {
  const { Testimonial } = await models();
  const docs = await Testimonial.find({ approved: { $ne: false } })
    .sort({ sortOrder: 1, _id: 1 })
    .lean();
  return docs.map(docJson);
}

export async function getSetting(key) {
  const { SiteSetting } = await models();
  const doc = await SiteSetting.findOne({ key }).lean();
  return doc?.value ?? null;
}

export async function setSetting(key, value) {
  const { SiteSetting } = await models();
  await SiteSetting.updateOne(
    { key },
    { $set: { value } },
    { upsert: true }
  );
}

export async function getSiteSettings() {
  const { SiteSetting } = await models();
  const docs = await SiteSetting.find().lean();
  const out = {};
  for (const r of docs) out[r.key] = r.value;
  return out;
}

export async function getContent() {
  await initDb();
  if (!(await isSeeded())) {
    const { seedDb } = await import("./defaults.mjs");
    await seedDb();
  }
  const [portfolio, experience, skills, awards, settings, partners, communities, testimonials] =
    await Promise.all([
      getPortfolioItems(),
      getExperience(),
      getSkills(),
      getAwards(),
      getSiteSettings(),
      getPartners(),
      getCommunities(),
      getTestimonials(),
    ]);
  return { portfolio, experience, skills, awards, settings, partners, communities, testimonials };
}

import { sql, initDb, isSeeded } from "./db";

export async function getPortfolioItems() {
  const res = await sql`
    SELECT id, src, category, sort_order AS "sortOrder"
    FROM portfolio_items
    ORDER BY sort_order ASC, id ASC
  `;
  return res.rows;
}

export async function getExperience() {
  const res = await sql`
    SELECT id, icon, title, description, date, color FROM experience ORDER BY id ASC
  `;
  return res.rows;
}

export async function getSkills() {
  const res = await sql`SELECT id, icon, name, target FROM skills ORDER BY id ASC`;
  return res.rows;
}

export async function getAwards() {
  const res = await sql`SELECT id, date, title, description FROM awards ORDER BY id ASC`;
  return res.rows;
}

export async function getSetting(key) {
  const res = await sql`SELECT value FROM site_settings WHERE key = ${key}`;
  return res.rows[0]?.value ?? null;
}

export async function setSetting(key, value) {
  await sql`
    INSERT INTO site_settings (key, value) VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;
}

export async function getSiteSettings() {
  const res = await sql`SELECT key, value FROM site_settings`;
  const out = {};
  for (const r of res.rows) out[r.key] = r.value;
  return out;
}

export async function getContent() {
  await initDb();
  if (!(await isSeeded())) {
    const { seedDb } = await import("./defaults.mjs");
    await seedDb(sql);
  }
  const [portfolio, experience, skills, awards, settings] = await Promise.all([
    getPortfolioItems(),
    getExperience(),
    getSkills(),
    getAwards(),
    getSiteSettings(),
  ]);
  return { portfolio, experience, skills, awards, settings };
}

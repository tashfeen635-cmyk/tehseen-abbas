import { db } from "./db";

export function getPortfolioItems() {
  return db
    .prepare(
      "SELECT id, src, category, sort_order AS sortOrder FROM portfolio_items ORDER BY sort_order ASC, id ASC"
    )
    .all();
}

export function getExperience() {
  return db
    .prepare("SELECT id, icon, title, description, date, color FROM experience ORDER BY id ASC")
    .all();
}

export function getSkills() {
  return db
    .prepare("SELECT id, icon, name, target FROM skills ORDER BY id ASC")
    .all();
}

export function getAwards() {
  return db
    .prepare("SELECT id, date, title, description FROM awards ORDER BY id ASC")
    .all();
}

export function getSetting(key) {
  const row = db.prepare("SELECT value FROM site_settings WHERE key = ?").get(key);
  return row ? row.value : null;
}

export function setSetting(key, value) {
  db.prepare(
    "INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  ).run(key, value);
}

export function getSiteSettings() {
  const rows = db.prepare("SELECT key, value FROM site_settings").all();
  const out = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}

export function getContent() {
  return {
    portfolio: getPortfolioItems(),
    experience: getExperience(),
    skills: getSkills(),
    awards: getAwards(),
    settings: getSiteSettings(),
  };
}

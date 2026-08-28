import { sql } from "@vercel/postgres";

let initialized = false;

export async function initDb() {
  if (initialized) return;
  initialized = true;
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_items (
      id SERIAL PRIMARY KEY,
      src TEXT NOT NULL,
      category TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS experience (
      id SERIAL PRIMARY KEY,
      icon TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      color TEXT NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,
      icon TEXT NOT NULL,
      name TEXT NOT NULL,
      target INTEGER NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS awards (
      id SERIAL PRIMARY KEY,
      date TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `;
}

export async function isSeeded() {
  const res = await sql`SELECT COUNT(*) AS c FROM portfolio_items`;
  const count = Number(res.rows[0]?.c ?? 0);
  return count > 0;
}

export { sql };

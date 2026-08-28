import { sql } from "@vercel/postgres";
import { seedDb } from "./lib/defaults.mjs";

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

await seedDb(sql);
console.log("Database seeded successfully against Postgres.");

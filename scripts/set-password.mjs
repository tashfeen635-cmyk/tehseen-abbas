import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

const password = process.argv[2] || "admin";
const username = process.argv[3] || "admin";
const hash = bcrypt.hashSync(password, 10);

await sql`
  CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)
`;

await sql`
  INSERT INTO site_settings (key, value) VALUES ('adminPasswordHash', ${hash})
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
`;
await sql`
  INSERT INTO site_settings (key, value) VALUES ('adminUsername', ${username})
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
`;

console.log(`Admin credentials set: username="${username}" password="${password}"`);

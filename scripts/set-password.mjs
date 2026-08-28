import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "portfolio.db");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

const password = process.argv[2] || "admin";
const username = process.argv[3] || "admin";
const hash = bcrypt.hashSync(password, 10);

db.prepare("INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
  .run("adminPasswordHash", hash);
db.prepare("INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
  .run("adminUsername", username);

console.log(`Admin credentials set: username="${username}" password="${password}"`);
db.close();

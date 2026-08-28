import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { seedDb } from "./defaults.mjs";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "portfolio.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS portfolio_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      src TEXT NOT NULL,
      category TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS experience (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      color TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT NOT NULL,
      name TEXT NOT NULL,
      target INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS awards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  const isEmpty =
    db.prepare("SELECT COUNT(*) AS c FROM portfolio_items").get().c === 0 &&
    db.prepare("SELECT COUNT(*) AS c FROM experience").get().c === 0 &&
    db.prepare("SELECT COUNT(*) AS c FROM site_settings").get().c === 0;
  if (isEmpty) {
    seedDb(db);
  }
}

initDb();

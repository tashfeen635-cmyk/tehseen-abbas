import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const cached = globalThis.mongoose || { conn: null, promise: null };
globalThis.mongoose = cached;

export async function connectDb() {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Add your MongoDB connection string to .env (or Vercel env vars)."
    );
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function initDb() {
  await connectDb();
}

export async function isSeeded() {
  await connectDb();
  const { PortfolioItem } = await import("./models.mjs");
  const count = await PortfolioItem.countDocuments();
  return count > 0;
}

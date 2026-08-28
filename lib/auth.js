import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getSetting, setSetting } from "./data";

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET || "tehseen-portfolio-admin-secret-change-me"
);
const SESSION_COOKIE = "admin_session";

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function isAuthenticated() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function getAdminHash() {
  return getSetting("adminPasswordHash");
}

export async function setAdminPassword(plain) {
  const hash = bcrypt.hashSync(plain, 10);
  await setSetting("adminPasswordHash", hash);
  await setSetting("adminUsername", process.env.ADMIN_USER || "admin");
}

export async function verifyAdmin(username, password) {
  if (process.env.ADMIN_USER && process.env.ADMIN_PASSWORD) {
    return (
      username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD
    );
  }
  const storedName = (await getSetting("adminUsername")) || "admin";
  const hash = await getAdminHash();
  if (!hash) return false;
  if (username !== storedName) return false;
  return bcrypt.compareSync(password, hash);
}

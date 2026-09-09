import { NextResponse } from "next/server";
import { getContent } from "../../../lib/data";

export const dynamic = "force-dynamic";

const TTL_MS = 10_000;
let cache = { value: null, at: 0 };
let inflight = null;

export async function GET() {
  const now = Date.now();
  if (cache.value && now - cache.at < TTL_MS) {
    return NextResponse.json(cache.value);
  }
  if (!inflight) {
    inflight = getContent()
      .then((value) => {
        cache = { value, at: Date.now() };
        return value;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return NextResponse.json(await inflight);
}

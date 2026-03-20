import { createClient } from "@libsql/client";

const CACHE_TTL = 5 * 60_000; // 5 minutes
const monthCache = {}; // { [monthKey]: { total, count, expiresAt } }

function getClient() {
  if (process.env.APP_ENV === "dev") {
    return createClient({ url: "file:./local.db" });
  }
  return createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

function normalizeName(name) {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function currentMonthKeyJST() {
  const now = new Date(Date.now() + 9 * 3_600_000); // UTC+9
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export default async function handler(req) {
  const client = getClient();

  if (req.method === "GET") {
    const url = new URL(req.url);
    const monthKey = url.searchParams.get("month") || currentMonthKeyJST();

    const cached = monthCache[monthKey];
    if (cached && Date.now() < cached.expiresAt) {
      return json({ total: cached.total, count: cached.count });
    }

    try {
      const result = await client.execute({
        sql: "SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count FROM donations WHERE month_key = ?",
        args: [monthKey],
      });
      const row = result.rows[0];
      const total = Number(row.total);
      const count = Number(row.count);
      monthCache[monthKey] = { total, count, expiresAt: Date.now() + CACHE_TTL };
      return json({ total, count });
    } catch {
      return json({ error: "Database error" }, 500);
    }
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    const { name, amount, transferDate, message = "" } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return json({ error: "Name is required" }, 400);
    }
    const amountNum = Number(amount);
    if (!Number.isInteger(amountNum) || amountNum < 1) {
      return json({ error: "Amount must be a positive integer" }, 400);
    }
    if (!transferDate || typeof transferDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(transferDate)) {
      return json({ error: "Transfer date must be YYYY-MM-DD" }, 400);
    }

    const monthKey = transferDate.slice(0, 7); // YYYY-MM
    const nameNormalized = normalizeName(name);

    try {
      const existing = await client.execute({
        sql: "SELECT id FROM donations WHERE name_normalized = ? AND amount = ? AND transfer_date = ? LIMIT 1",
        args: [nameNormalized, amountNum, transferDate],
      });
      if (existing.rows.length > 0) {
        return json({ error: "duplicate" }, 409);
      }
    } catch {
      return json({ error: "Database error" }, 500);
    }

    try {
      await client.execute({
        sql: "INSERT INTO donations (name, name_normalized, amount, transfer_date, message, month_key, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [name.trim(), nameNormalized, amountNum, transferDate, message.trim(), monthKey, new Date().toISOString()],
      });
      delete monthCache[monthKey];
      return json({ success: true });
    } catch {
      return json({ error: "Failed to save donation" }, 500);
    }
  }

  return json({ error: "Method not allowed" }, 405);
}

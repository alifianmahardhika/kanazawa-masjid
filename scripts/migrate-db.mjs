/**
 * Database migration script.
 *
 * Run manually:   bun run migrate
 * Auto-run:       set RUN_MIGRATIONS=true in Netlify env vars before deploying.
 *                 After the migration completes, unset it so it doesn't re-run
 *                 on every subsequent deploy.
 *
 * Local dev:      APP_ENV=dev  → writes to ./local.db (SQLite)
 * Production:     TURSO_DATABASE_URL + TURSO_AUTH_TOKEN required
 */

import { createClient } from "@libsql/client";

if (process.env.RUN_MIGRATIONS !== "true") {
  console.log("RUN_MIGRATIONS is not 'true' — skipping migrations.");
  process.exit(0);
}

function getClient() {
  if (process.env.APP_ENV === "dev") {
    console.log("Using local SQLite database: ./local.db");
    return createClient({ url: "file:./local.db" });
  }

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error(
      "ERROR: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set for production migrations."
    );
    process.exit(1);
  }

  console.log(`Using Turso database: ${url}`);
  return createClient({ url, authToken });
}

/**
 * Ordered list of migrations. Each entry has:
 *   version  — unique identifier; never rename or reorder existing ones
 *   sql      — DDL to execute (idempotent where possible)
 */
const MIGRATIONS = [
  {
    version: "001_create_registrations",
    sql: `
      CREATE TABLE IF NOT EXISTS registrations (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id     TEXT    NOT NULL DEFAULT '',
        name         TEXT    NOT NULL,
        name_normalized TEXT NOT NULL DEFAULT '',
        session      INTEGER NOT NULL,
        attendees    INTEGER NOT NULL DEFAULT 1,
        created_at   TEXT    NOT NULL
      )
    `,
  },
  {
    version: "002_create_schema_migrations",
    sql: `
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version    TEXT NOT NULL PRIMARY KEY,
        applied_at TEXT NOT NULL
      )
    `,
  },
  {
    version: "003_create_donations",
    sql: `
      CREATE TABLE IF NOT EXISTS donations (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        name            TEXT    NOT NULL,
        name_normalized TEXT    NOT NULL,
        amount          INTEGER NOT NULL,
        transfer_date   TEXT    NOT NULL,
        message         TEXT    NOT NULL DEFAULT '',
        month_key       TEXT    NOT NULL,
        created_at      TEXT    NOT NULL
      )
    `,
  },
  // Add future migrations here — never edit or remove existing ones.
];

async function migrate() {
  const client = getClient();

  // Bootstrap the tracking table so we can record applied versions.
  await client.execute(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version    TEXT NOT NULL PRIMARY KEY,
      applied_at TEXT NOT NULL
    )
  `);

  const applied = await client.execute(
    "SELECT version FROM schema_migrations"
  );
  const appliedSet = new Set(applied.rows.map((r) => r.version));

  let ran = 0;
  for (const migration of MIGRATIONS) {
    if (appliedSet.has(migration.version)) {
      console.log(`  ✓ ${migration.version} (already applied)`);
      continue;
    }

    console.log(`  → Running ${migration.version} ...`);
    await client.execute(migration.sql);
    await client.execute({
      sql: "INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)",
      args: [migration.version, new Date().toISOString()],
    });
    console.log(`  ✓ ${migration.version} applied`);
    ran++;
  }

  console.log(
    ran === 0
      ? "\nAll migrations already applied — nothing to do."
      : `\n${ran} migration(s) applied successfully.`
  );
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});

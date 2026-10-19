import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../../../drizzle/schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is missing.');
}

/**
 * Cache connection across hot-reloads in development to prevent connection exhaustion.
 * Disable prefetch (prepare: false) as it is not supported in Supabase Transaction pooler mode.
 */
declare global {
  // eslint-disable-next-line no-var
  var __dbClient: postgres.Sql | undefined;
}

const client =
  globalThis.__dbClient ??
  postgres(connectionString, {
    prepare: false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__dbClient = client;
}

export const db = drizzle(client, { schema });
export * from '../../../drizzle/schema';

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
 schema: "./src/lib/db/schemas",
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_AUTH_TOKEN as string,
  },
  verbose: true,
  strict: true,
})

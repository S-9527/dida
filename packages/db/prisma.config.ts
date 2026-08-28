import path from 'node:path'
import { config as loadEnv } from 'dotenv'
import { defineConfig } from 'prisma/config'

const repoRoot = path.resolve(__dirname, '../..')
loadEnv({ path: path.join(repoRoot, '.env') })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
  prisma: {
    seed: 'pnpm exec tsx prisma/seed.ts',
  },
})

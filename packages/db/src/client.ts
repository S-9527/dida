import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'

export * from './generated/prisma/client'

function getDatabaseUrl(): string {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString)
    throw new Error('DATABASE_URL is not set. Please provide it via the environment variables.')
  return connectionString
}

export function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: getDatabaseUrl() })
  return new PrismaClient({ adapter })
}

export class DidaPrismaClient extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({ connectionString: getDatabaseUrl() })
    super({ adapter })
  }
}

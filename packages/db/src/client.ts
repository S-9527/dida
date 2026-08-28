import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'

export * from './generated/prisma/client'

const DEFAULT_DATABASE_URL = 'postgresql://dida:dida123456@localhost:5432/dida'

export function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

export class DidaPrismaClient extends PrismaClient {
  constructor() {
    const connectionString = process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL
    const adapter = new PrismaPg({ connectionString })
    super({ adapter })
  }
}

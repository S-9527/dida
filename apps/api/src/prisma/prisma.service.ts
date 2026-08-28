import type { PrismaClient } from '@dida/db'
import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { createPrismaClient } from '@dida/db'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public readonly client: PrismaClient

  constructor() {
    this.client = createPrismaClient()
  }

  async onModuleInit() {
    await this.client.$connect()
  }

  async onModuleDestroy() {
    await this.client.$disconnect()
  }
}

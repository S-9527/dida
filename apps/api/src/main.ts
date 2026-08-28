import path from 'node:path'
import process from 'node:process'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { config as loadEnv } from 'dotenv'
import { AppModule } from './app/app.module'
import { appGlobalMiddleware } from './core/useGlobal'

const repoRoot = path.resolve(__dirname, '../../..')
loadEnv({ path: path.join(repoRoot, '.env') })

const CLIENT_ORIGIN = 'http://localhost:5173'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())

  app.enableCors({
    origin: [CLIENT_ORIGIN, /^http:\/\/localhost(:\d+)?$/],
    credentials: true,
  })

  appGlobalMiddleware(app)

  const port = Number(process.env.PORT) || 3000
  await app.listen(port)
}
bootstrap()

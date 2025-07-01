import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appGlobalMiddleware } from "./core/useGloabl";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [/^http:\/\/localhost(:\d+)?$/]
  });

  appGlobalMiddleware(app);

  await app.listen(3000);
}
bootstrap();

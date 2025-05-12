import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS with credentials
  app.enableCors({
    origin: config.corsOrigin,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(config.port);
}
bootstrap();

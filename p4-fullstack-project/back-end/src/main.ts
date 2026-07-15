import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());   // Ativa a validacao automatica em todas as rotas da API
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

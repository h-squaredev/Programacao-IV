import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());   // Ativa a validacao automatica em todas as rotas da API
  const port = process.env.PORT || 3000; // Usa a porta definida na variável de ambiente ou 3000 como padrão
  await app.listen(port);
  console.log(`Aplicação rodando na porta ${port}`);
}
bootstrap();

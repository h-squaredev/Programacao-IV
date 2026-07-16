import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // <-- Importado aqui

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // CONFIGURAÇÃO DO SWAGGER (Adicione este bloco antes do app.listen)
  const config = new DocumentBuilder()
    .setTitle('API de Conteúdo Dinâmico - Trabalho P4')
    .setDescription('Documentação interativa para a API de Posts e Autenticação JWT')
    .setVersion('1.0')
    .addBearerAuth() // Permite colar o Token JWT para testar as rotas protegidas
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Define que a documentação ficará na rota /api

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicação rodando na porta ${port}`);
}
bootstrap();
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Libera o app (web/Expo) para chamar a API. Em producao troque por a origem do seu dominio
  app.enableCors();
  
  await app.listen(process.env.PORT || 3000);
  console.log(`✅ Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();
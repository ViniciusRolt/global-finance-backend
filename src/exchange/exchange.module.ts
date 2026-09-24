import { Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { PrismaService } from '../prisma.service';

// @Module = decorador que define um modulo
@Module({
  // controllers = as rotas HTTP deste modulo
  controllers: [ExchangeController],
  
  // providers = os servicos disponiveis
  providers: [
    ExchangeService,   // Logica de cambio
    PrismaService,     // Banco de dados
  ],
  
  // exports = o que este modulo oferece para outros
  // Exemplo: Outro modulo pode usar ExchangeService se precisar
  exports: [ExchangeService],
})
export class ExchangeModule {}
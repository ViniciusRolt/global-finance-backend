// Importacoes
import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

// @Module = decorador que define um modulo
@Module({
  // imports = modulos que este modulo precisa
  imports: [
    // AuthModule = precisa do JwtAuthGuard para proteger rotas
    AuthModule,
  ],
  
  // controllers = as rotas HTTP deste modulo
  controllers: [TransactionsController],
  
  // providers = os servicos disponiveis
  providers: [
    TransactionsService,   // Logica de transacoes
    PrismaService,         // Banco de dados
  ],
  
  // exports = o que este modulo oferece para outros
  exports: [TransactionsService],
})
export class TransactionsModule {}
// Importacoes
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// @Injectable = decorador que torna a classe um servico disponivel para injecao
@Injectable()
// extends PrismaClient = herda todas as funcionalidades do Prisma
// OnModuleInit = interface que executa algo quando o modulo inicia
// OnModuleDestroy = interface que executa algo quando o modulo fecha
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  // Executado quando a aplicacao inicia
  async onModuleInit() {
    // Conecta ao banco de dados
    await this.$connect();
    console.log('✅ Prisma conectado ao PostgreSQL');
  }

  // Executado quando a aplicacao fecha
  async onModuleDestroy() {
    // Desconecta do banco de forma limpa
    await this.$disconnect();
  }
}
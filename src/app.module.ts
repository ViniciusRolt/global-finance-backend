import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExchangeModule } from './exchange/exchange.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    ExchangeModule,
    TransactionsModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
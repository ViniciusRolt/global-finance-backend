// Importacoes
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';        // Modulo JWT
import { PassportModule } from '@nestjs/passport'; // Modulo Passport
import { ConfigService } from '@nestjs/config';    // Servico de configuracao
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma.service';

// @Module = decorador que define um modulo
@Module({
  // imports = modulos que este modulo precisa
  imports: [
    // PassportModule = biblioteca de autenticacao
    PassportModule,
    
    // JwtModule = modulo de JWT
    // registerAsync = configuracao assincrona (espera ConfigService)
    JwtModule.registerAsync({
      // inject = injeta o ConfigService
      inject: [ConfigService],
      
      // useFactory = usa uma funcao para criar a configuracao
      useFactory: (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET') || 'sua-chave-secreta',
  signOptions: {
    expiresIn: '7d',
  },
}),
    }),
  ],
  
  // controllers = as rotas HTTP deste modulo
  controllers: [AuthController],
  
  // providers = os servicos disponiveis
  providers: [
    AuthService,   // Logica de autenticacao
    JwtStrategy,   // Validacao do JWT
    PrismaService, // Banco de dados
  ],
  
  // exports = o que este modulo oferece para outros modulos
  // Exemplo: UsersModule pode usar JwtStrategy
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
// Importacoes
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';  // Criptografia de senha
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,  // Banco de dados
    private jwtService: JwtService,  // Servico de JWT
  ) {}

  // ===== REGISTRO =====
  async register(data: CreateUserDto) {
    // 1 Verificar se o email ja existe
    const usuarioExistente = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (usuarioExistente) {
      // Se existe, lancar erro
      throw new BadRequestException('Email ja cadastrado');
    }

    // 2 Hash da senha
    // bcrypt.hash(senha, 10)
    // 10 = numero de rounds (quanto maior, mais seguro mas mais lento)
    // Exemplo:
    // Entrada: "SenhaForte123!"
    // Saida: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/LYe"
    const senhaHasheada = await bcrypt.hash(data.senha, 10);

    // 3 Criar usuario no banco
    const usuario = await this.prisma.user.create({
      data: {
        email: data.email,
        senha: senhaHasheada,  // Guarda o hash, nao a senha original!
        nome: data.nome,
      },
    });

    // 4 Gerar token JWT
    // sub = subject (id do usuario)
    const token = this.jwtService.sign({
      sub: usuario.id,
      email: usuario.email,
    });
    // Resultado: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

    // 5 Retornar token e dados do usuario
    // IMPORTANTE: nao retornar a senha!
    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      },
    };
  }

  // ===== LOGIN =====
  async login(data: LoginDto) {
    // Buscar usuario no banco
    const usuario = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    // Se nao encontrou usuario, erro generico
    // (nao dizemos "usuario nao existe" por seguranca)
    if (!usuario) {
      throw new UnauthorizedException('Email ou senha invalidos');
    }

    //  Validar senha
    // bcrypt.compare(senhaDigitada, senhaHash)
    // Compara a senha que o usuario digitou com o hash armazenado
    // Retorna true se corresponder, false se nao
    // Exemplo:
    // senhaDigitada: "SenhaForte123!"
    // senhaHash: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/LYe"
    // Resultado: true (correspondem)
    const senhaValida = await bcrypt.compare(data.senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Email ou senha invalidos');
    }

    //  Gerar token JWT
    const token = this.jwtService.sign({
      sub: usuario.id,
      email: usuario.email,
    });

    // 4 Retornar token e dados
    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      },
    };
  }
}
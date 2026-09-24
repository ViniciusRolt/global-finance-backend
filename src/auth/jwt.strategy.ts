// Importacoes
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';  // Biblioteca de autenticacao
import { ExtractJwt, Strategy } from 'passport-jwt';  // Extrai token do header
import { PrismaService } from '../prisma.service';     // Acessa o banco

// @Injectable = servico que pode ser injetado
@Injectable()
// extends PassportStrategy(Strategy) = herda a estrategia do Passport
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  // Recebe o PrismaService (banco de dados)
  constructor(private prisma: PrismaService) {
    // Configuracao do JWT
    super({
      // De onde extrair o token?
      // Authorization: Bearer <token-aqui>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // ignoreExpiration = false
      // Significa: nao ignore se o token expirou
      // Se token expirou, da erro
      ignoreExpiration: false,
      
      // Chave secreta para validar o token
      // Le de .env ou usa valor padrao
      secretOrKey: process.env.JWT_SECRET || 'sua-chave-secreta',
    });
  }

  // Validar o token
  // Se token eh valido, esta funcao eh chamada
  async validate(payload: any) {
    // payload = conteudo do token decodificado
    // payload.sub = id do usuario (definido quando criou o token)
    
    // Buscar usuario no banco pelo ID
    const usuario = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    // Se usuario nao existe mais, nega acesso
    if (!usuario) {
      return null;
    }

    // Se tudo ok, retorna dados do usuario
    // Este objeto fica disponivel em req.user nas rotas
    return {
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
    };
  }
}
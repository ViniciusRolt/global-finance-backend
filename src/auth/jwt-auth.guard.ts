// Importacoes
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// @Injectable = servico que pode ser injetado
@Injectable()
// extends AuthGuard('jwt') = herda a logica de autenticacao JWT
// 'jwt' = refere-se ao JwtStrategy que criamos antes
export class JwtAuthGuard extends AuthGuard('jwt') {}
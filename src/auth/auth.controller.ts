// Importacoes
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// @Controller('auth') = todas as rotas comecam com /auth
// Exemplo: http://localhost:3000/auth/register
@Controller('auth')
export class AuthController {
  // Injeta o AuthService para usar a logica
  constructor(private authService: AuthService) {}

  // @Post('register') = POST /auth/register
  // @Body() = extrai o corpo da requisicao JSON
  // data = { email, senha, nome }
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    // Chama o servico que faz todo o trabalho
    return this.authService.register(data);
  }

  // @Post('login') = POST /auth/login
  // @Body() = extrai o corpo da requisicao JSON
  // data = { email, senha }
  @Post('login')
  async login(@Body() data: LoginDto) {
    // Chama o servico que faz todo o trabalho
    return this.authService.login(data);
  }
}
// Importacoes
import { Controller, Get, Patch, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  // Protege as rotas
import { UsersService } from './users.service';

// @Controller('users') = todas as rotas comecam com /users
@Controller('users')

// @UseGuards(JwtAuthGuard) = TODAS as rotas precisa de token JWT
// Se tentar acessar sem token, recebe 401 Unauthorized
@UseGuards(JwtAuthGuard)
export class UsersController {
  // Injeta o UsersService
  constructor(private usersService: UsersService) {}

  // ===== GET /users/profile =====
  // Ver o perfil do usuario logado
  @Get('profile')
  async getProfile(@Request() req: any) {
    // req.user = { id, email, nome } (vem do JwtAuthGuard)
    return this.usersService.getProfile(req.user.id);
  }

  // ===== PATCH /users/profile =====
  // Atualizar o perfil (nome, email, etc)
  // PATCH = atualizar parcialmente (nao precisa enviar todos os campos)
  @Patch('profile')
  async updateProfile(@Request() req: any, @Body() data: any) {
    // data = { nome: "Novo Nome", email: "novo@email.com", etc }
    return this.usersService.updateProfile(req.user.id, data);
  }

  // ===== GET /users/dashboard =====
  // Ver o dashboard consolidado
  // Retorna: contas, saldos, transacoes recentes, analise por categoria
  @Get('dashboard')
  async getDashboard(@Request() req: any) {
    return this.usersService.getDashboard(req.user.id);
  }

  // ===== GET /users/accounts =====
  // Listar todas as contas do usuario
  @Get('accounts')
  async getAccounts(@Request() req: any) {
    return this.usersService.getAccounts(req.user.id);
  }

  // ===== POST /users/accounts =====
  // Vincular uma nova conta (Barclays, Wise, Nubank, etc)
  @Post('accounts')
  async linkAccount(@Request() req: any, @Body() data: any) {
    // data = { banco: "Barclays", moeda: "GBP", saldo: 5000 }
    return this.usersService.linkAccount(req.user.id, data);
  }
}
import { Controller, Get, Post, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

// @Controller('transactions') = todas as rotas comecam com /transactions
@Controller('transactions')

// @UseGuards(JwtAuthGuard) = TODAS as rotas precisa de token JWT
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  // ===== POST /transactions =====
  // Criar nova transacao
  @Post()
  async create(@Request() req: any, @Body() data: CreateTransactionDto) {
    // data = { contaId, valor, categoria, descricao, tipo }
    return this.transactionsService.create(req.user.id, data);
  }

  // ===== GET /transactions =====
  // Listar transacoes com filtros opcionais
  // Exemplo: GET /transactions?categoria=Alimentacao&limit=10
  @Get()
  async findAll(
    @Request() req: any,
    @Query('categoria') categoria?: string,  // Opcional
    @Query('contaId') contaId?: string,      // Opcional
    @Query('limit') limit?: string,          // Opcional
  ) {
    return this.transactionsService.findAll(req.user.id, {
      categoria,
      contaId,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  // ===== GET /transactions/summary =====
  // Resumo do mes: receita, despesa, saldo
  @Get('summary')
  async getSummary(@Request() req: any) {
    return this.transactionsService.getSummary(req.user.id);
  }

  // ===== GET /transactions/breakdown =====
  // Analise por categoria
  // Exemplo: GET /transactions/breakdown?mes=1&ano=2024
  @Get('breakdown')
  async getCategoryBreakdown(
    @Request() req: any,
    @Query('mes') mes?: string,  // Opcional (padrao: mes atual)
    @Query('ano') ano?: string,  // Opcional (padrao: ano atual)
  ) {
    return this.transactionsService.getCategoryBreakdown(
      req.user.id,
      mes ? parseInt(mes) : undefined,
      ano ? parseInt(ano) : undefined,
    );
  }

  // ===== GET /transactions/:id =====
  // Ver detalhes de uma transacao especifica
  // Exemplo: GET /transactions/txn789
  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    // :id = parametro da rota
    return this.transactionsService.findOne(req.user.id, id);
  }
}
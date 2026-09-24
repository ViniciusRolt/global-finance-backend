import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateTransactionDto) {
    // Validar que a conta pertence ao usuario
    const conta = await this.prisma.account.findUnique({
      where: { id: data.contaId },
    });

    if (!conta || conta.userId !== userId) {
      throw new BadRequestException('Conta nao encontrada');
    }

    // Criar transacao
    const transacao = await this.prisma.transaction.create({
      data: {
        contaId: data.contaId,
        userId,
        valor: data.valor,
        categoria: data.categoria,
        descricao: data.descricao,
        tipo: data.tipo,
      },
      select: {
        id: true,
        valor: true,
        categoria: true,
        descricao: true,
        data: true,
        tipo: true,
      },
    });

    // Atualizar saldo da conta
    if (data.tipo === 'income') {
      await this.prisma.account.update({
        where: { id: data.contaId },
        data: {
          saldo: {
            increment: data.valor,
          },
        },
      });
    } else {
      await this.prisma.account.update({
        where: { id: data.contaId },
        data: {
          saldo: {
            decrement: data.valor,
          },
        },
      });
    }

    return transacao;
  }

  async findAll(userId: string, filters?: any) {
    const where: any = { userId };

    if (filters?.categoria && filters.categoria !== 'Todas') {
      where.categoria = filters.categoria;
    }

    if (filters?.contaId) {
      where.contaId = filters.contaId;
    }

    const transacoes = await this.prisma.transaction.findMany({
      where,
      take: filters?.limit || 50,
      orderBy: { data: 'desc' },
      select: {
        id: true,
        valor: true,
        categoria: true,
        descricao: true,
        data: true,
        tipo: true,
        account: {
          select: {
            banco: true,
            moeda: true,
          },
        },
      },
    });

    return transacoes;
  }

  async findOne(userId: string, id: string) {
    const transacao = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transacao) {
      throw new NotFoundException('Transacao nao encontrada');
    }

    if (transacao.userId !== userId) {
      throw new NotFoundException('Transacao nao encontrada');
    }

    return transacao;
  }

  async getSummary(userId: string) {
    const mesAtual = new Date();
    mesAtual.setDate(1);

    const resumo = await this.prisma.transaction.groupBy({
      by: ['tipo'],
      where: {
        userId,
        data: {
          gte: mesAtual,
        },
      },
      _sum: {
        valor: true,
      },
    });

    const receita = resumo.find((s: any) => s.tipo === 'income')?._sum.valor || 0;
    const despesa = resumo.find((s: any) => s.tipo === 'expense')?._sum.valor || 0;

    return {
      periodo: {
        inicio: mesAtual,
        fim: new Date(),
      },
      receita,
      despesa,
      saldo: receita - despesa,
    };
  }

  async getCategoryBreakdown(userId: string, mes?: number, ano?: number) {
    const dataAtual = new Date();
    const mesSelecionado = mes || dataAtual.getMonth() + 1;
    const anoSelecionado = ano || dataAtual.getFullYear();

    const primeiroDia = new Date(anoSelecionado, mesSelecionado - 1, 1);
    const ultimoDia = new Date(anoSelecionado, mesSelecionado, 0);

    const analise = await this.prisma.transaction.groupBy({
      by: ['categoria'],
      where: {
        userId,
        data: {
          gte: primeiroDia,
          lte: ultimoDia,
        },
      },
      _sum: {
        valor: true,
      },
    });

    return analise.map((item: any) => ({
      categoria: item.categoria,
      total: item._sum.valor,
    }));
  }
}
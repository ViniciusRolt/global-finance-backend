import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const usuario = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nome: true,
        criadoEm: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    return usuario;
  }

  async updateProfile(userId: string, data: any) {
    const usuario = await this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        nome: true,
      },
    });

    return usuario;
  }

  async getDashboard(userId: string) {
    const contas = await this.prisma.account.findMany({
      where: { userId },
      select: {
        id: true,
        banco: true,
        moeda: true,
        saldo: true,
      },
    });

    const saldoTotalGBP = contas
      .filter((acc: any) => acc.moeda === 'GBP')
      .reduce((soma: any, acc: any) => soma + acc.saldo, 0);

    const transacoesRecentes = await this.prisma.transaction.findMany({
      where: { userId },
      take: 5,
      orderBy: { data: 'desc' },
      select: {
        id: true,
        valor: true,
        categoria: true,
        descricao: true,
        data: true,
        tipo: true,
      },
    });

    const mesAtual = new Date();
    mesAtual.setDate(1);

    const transacoesPorCategoria = await this.prisma.transaction.groupBy({
      by: ['categoria'],
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

    return {
      usuario: {
        id: userId,
      },
      contas,
      saldoTotalGBP,
      transacoesRecentes,
      transacoesPorCategoria: transacoesPorCategoria.map((tc: any) => ({
        categoria: tc.categoria,
        total: tc._sum.valor,
      })),
    };
  }

  async linkAccount(userId: string, data: any) {
    const conta = await this.prisma.account.create({
      data: {
        userId,
        banco: data.banco,
        moeda: data.moeda,
        saldo: data.saldo || 0,
      },
    });

    return conta;
  }

  async getAccounts(userId: string) {
    const contas = await this.prisma.account.findMany({
      where: { userId },
      select: {
        id: true,
        banco: true,
        moeda: true,
        saldo: true,
        criadoEm: true,
      },
      orderBy: { criadoEm: 'desc' },
    });

    return contas;
  }
}

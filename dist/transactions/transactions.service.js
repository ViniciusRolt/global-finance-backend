"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TransactionsService = class TransactionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        // Validar que a conta pertence ao usuario
        const conta = await this.prisma.account.findUnique({
            where: { id: data.contaId },
        });
        if (!conta || conta.userId !== userId) {
            throw new common_1.BadRequestException('Conta nao encontrada');
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
        }
        else {
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
    async findAll(userId, filters) {
        const where = { userId };
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
    async findOne(userId, id) {
        const transacao = await this.prisma.transaction.findUnique({
            where: { id },
        });
        if (!transacao) {
            throw new common_1.NotFoundException('Transacao nao encontrada');
        }
        if (transacao.userId !== userId) {
            throw new common_1.NotFoundException('Transacao nao encontrada');
        }
        return transacao;
    }
    async getSummary(userId) {
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
        const receita = resumo.find((s) => s.tipo === 'income')?._sum.valor || 0;
        const despesa = resumo.find((s) => s.tipo === 'expense')?._sum.valor || 0;
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
    async getCategoryBreakdown(userId, mes, ano) {
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
        return analise.map((item) => ({
            categoria: item.categoria,
            total: item._sum.valor,
        }));
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map
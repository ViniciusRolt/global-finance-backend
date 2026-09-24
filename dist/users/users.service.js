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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
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
            throw new common_1.NotFoundException('Usuario nao encontrado');
        }
        return usuario;
    }
    async updateProfile(userId, data) {
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
    async getDashboard(userId) {
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
            .filter((acc) => acc.moeda === 'GBP')
            .reduce((soma, acc) => soma + acc.saldo, 0);
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
            transacoesPorCategoria: transacoesPorCategoria.map((tc) => ({
                categoria: tc.categoria,
                total: tc._sum.valor,
            })),
        };
    }
    async linkAccount(userId, data) {
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
    async getAccounts(userId) {
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map
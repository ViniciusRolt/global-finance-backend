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
exports.ExchangeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ExchangeService = class ExchangeService {
    constructor(prisma) {
        this.prisma = prisma;
        this.FRANKFURTER_API = 'https://api.frankfurter.app';
    }
    async getRates(from, to) {
        try {
            const response = await fetch(`${this.FRANKFURTER_API}/latest?from=${from}&to=${to}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar taxas');
            }
            const data = await response.json();
            const taxa = data.rates[to];
            if (!taxa) {
                throw new Error('Taxa nao encontrada');
            }
            // Salvar no banco (cache)
            await this.prisma.exchangeRate.create({
                data: {
                    moedaBase: from,
                    moedaAlvo: to,
                    taxa,
                },
            });
            return {
                from,
                to,
                taxa,
                timestamp: new Date(),
            };
        }
        catch (erro) {
            // Se der erro, tenta buscar taxa mais recente no banco
            const taxaCacheada = await this.prisma.exchangeRate.findFirst({
                where: {
                    moedaBase: from,
                    moedaAlvo: to,
                },
                orderBy: {
                    data: 'desc',
                },
            });
            if (taxaCacheada) {
                return {
                    from,
                    to,
                    taxa: taxaCacheada.taxa,
                    timestamp: taxaCacheada.data,
                    cacheado: true,
                };
            }
            throw erro;
        }
    }
    async getHistoricalRates(from, to, dias = 30) {
        const dataLimite = new Date();
        dataLimite.setDate(dataLimite.getDate() - dias);
        const taxas = await this.prisma.exchangeRate.findMany({
            where: {
                moedaBase: from,
                moedaAlvo: to,
                data: {
                    gte: dataLimite,
                },
            },
            orderBy: {
                data: 'asc',
            },
            select: {
                data: true,
                taxa: true,
            },
        });
        return {
            from,
            to,
            dias,
            dados: taxas,
        };
    }
    async convertAmount(valor, from, to) {
        const dadosTaxa = await this.getRates(from, to);
        const valorConvertido = valor * dadosTaxa.taxa;
        return {
            original: {
                valor,
                moeda: from,
            },
            convertido: {
                valor: parseFloat(valorConvertido.toFixed(2)),
                moeda: to,
            },
            taxa: dadosTaxa.taxa,
        };
    }
};
exports.ExchangeService = ExchangeService;
exports.ExchangeService = ExchangeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExchangeService);
//# sourceMappingURL=exchange.service.js.map
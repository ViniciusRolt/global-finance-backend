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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeController = void 0;
const common_1 = require("@nestjs/common");
const exchange_service_1 = require("./exchange.service");
// @Controller('exchange') = todas as rotas comecam com /exchange
let ExchangeController = class ExchangeController {
    // Injeta o ExchangeService
    constructor(exchangeService) {
        this.exchangeService = exchangeService;
    }
    // ===== GET /exchange/rates =====
    // Pegar a taxa de cambio atual
    // Exemplo: GET /exchange/rates?from=BRL&to=GBP
    async getRates(from = 'BRL', to = 'GBP') {
        // Chama o servico
        return this.exchangeService.getRates(from, to);
    }
    // ===== GET /exchange/historical =====
    // Pegar historico de taxas
    // Exemplo: GET /exchange/historical?from=BRL&to=GBP&dias=30
    async getHistorical(from = 'BRL', to = 'GBP', dias = '30') {
        // parseInt() converte string "30" em numero 30
        return this.exchangeService.getHistoricalRates(from, to, parseInt(dias));
    }
    // ===== GET /exchange/convert =====
    // Converter um valor de uma moeda para outra
    // Exemplo: GET /exchange/convert?valor=1000&from=BRL&to=GBP
    async convert(valor, from = 'BRL', to = 'GBP') {
        // parseFloat() converte string "1000" em numero 1000
        return this.exchangeService.convertAmount(parseFloat(valor), from, to);
    }
};
exports.ExchangeController = ExchangeController;
__decorate([
    (0, common_1.Get)('rates'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExchangeController.prototype, "getRates", null);
__decorate([
    (0, common_1.Get)('historical'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __param(2, (0, common_1.Query)('dias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExchangeController.prototype, "getHistorical", null);
__decorate([
    (0, common_1.Get)('convert'),
    __param(0, (0, common_1.Query)('valor')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExchangeController.prototype, "convert", null);
exports.ExchangeController = ExchangeController = __decorate([
    (0, common_1.Controller)('exchange'),
    __metadata("design:paramtypes", [exchange_service_1.ExchangeService])
], ExchangeController);
//# sourceMappingURL=exchange.controller.js.map
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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const transactions_service_1 = require("./transactions.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
// @Controller('transactions') = todas as rotas comecam com /transactions
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    // ===== POST /transactions =====
    // Criar nova transacao
    async create(req, data) {
        // data = { contaId, valor, categoria, descricao, tipo }
        return this.transactionsService.create(req.user.id, data);
    }
    // ===== GET /transactions =====
    // Listar transacoes com filtros opcionais
    // Exemplo: GET /transactions?categoria=Alimentacao&limit=10
    async findAll(req, categoria, contaId, limit) {
        return this.transactionsService.findAll(req.user.id, {
            categoria,
            contaId,
            limit: limit ? parseInt(limit) : undefined,
        });
    }
    // ===== GET /transactions/summary =====
    // Resumo do mes: receita, despesa, saldo
    async getSummary(req) {
        return this.transactionsService.getSummary(req.user.id);
    }
    // ===== GET /transactions/breakdown =====
    // Analise por categoria
    // Exemplo: GET /transactions/breakdown?mes=1&ano=2024
    async getCategoryBreakdown(req, mes, ano) {
        return this.transactionsService.getCategoryBreakdown(req.user.id, mes ? parseInt(mes) : undefined, ano ? parseInt(ano) : undefined);
    }
    // ===== GET /transactions/:id =====
    // Ver detalhes de uma transacao especifica
    // Exemplo: GET /transactions/txn789
    async findOne(req, id) {
        // :id = parametro da rota
        return this.transactionsService.findOne(req.user.id, id);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('categoria')),
    __param(2, (0, common_1.Query)('contaId')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('breakdown'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('mes')),
    __param(2, (0, common_1.Query)('ano')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getCategoryBreakdown", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findOne", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)('transactions')
    // @UseGuards(JwtAuthGuard) = TODAS as rotas precisa de token JWT
    ,
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map
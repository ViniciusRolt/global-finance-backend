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
exports.UsersController = void 0;
// Importacoes
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard"); // Protege as rotas
const users_service_1 = require("./users.service");
// @Controller('users') = todas as rotas comecam com /users
let UsersController = class UsersController {
    // Injeta o UsersService
    constructor(usersService) {
        this.usersService = usersService;
    }
    // ===== GET /users/profile =====
    // Ver o perfil do usuario logado
    async getProfile(req) {
        // req.user = { id, email, nome } (vem do JwtAuthGuard)
        return this.usersService.getProfile(req.user.id);
    }
    // ===== PATCH /users/profile =====
    // Atualizar o perfil (nome, email, etc)
    // PATCH = atualizar parcialmente (nao precisa enviar todos os campos)
    async updateProfile(req, data) {
        // data = { nome: "Novo Nome", email: "novo@email.com", etc }
        return this.usersService.updateProfile(req.user.id, data);
    }
    // ===== GET /users/dashboard =====
    // Ver o dashboard consolidado
    // Retorna: contas, saldos, transacoes recentes, analise por categoria
    async getDashboard(req) {
        return this.usersService.getDashboard(req.user.id);
    }
    // ===== GET /users/accounts =====
    // Listar todas as contas do usuario
    async getAccounts(req) {
        return this.usersService.getAccounts(req.user.id);
    }
    // ===== POST /users/accounts =====
    // Vincular uma nova conta (Barclays, Wise, Nubank, etc)
    async linkAccount(req, data) {
        // data = { banco: "Barclays", moeda: "GBP", saldo: 5000 }
        return this.usersService.linkAccount(req.user.id, data);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('accounts'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAccounts", null);
__decorate([
    (0, common_1.Post)('accounts'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "linkAccount", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users')
    // @UseGuards(JwtAuthGuard) = TODAS as rotas precisa de token JWT
    // Se tentar acessar sem token, recebe 401 Unauthorized
    ,
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
// Importacoes
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
// @Injectable = decorador que torna a classe um servico disponivel para injecao
let PrismaService = class PrismaService extends client_1.PrismaClient {
    // Executado quando a aplicacao inicia
    async onModuleInit() {
        // Conecta ao banco de dados
        await this.$connect();
        console.log('✅ Prisma conectado ao PostgreSQL');
    }
    // Executado quando a aplicacao fecha
    async onModuleDestroy() {
        // Desconecta do banco de forma limpa
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
    // extends PrismaClient = herda todas as funcionalidades do Prisma
    // OnModuleInit = interface que executa algo quando o modulo inicia
    // OnModuleDestroy = interface que executa algo quando o modulo fecha
], PrismaService);
//# sourceMappingURL=prisma.service.js.map
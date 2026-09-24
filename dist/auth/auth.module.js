"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
// Importacoes
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt"); // Modulo JWT
const passport_1 = require("@nestjs/passport"); // Modulo Passport
const config_1 = require("@nestjs/config"); // Servico de configuracao
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
const prisma_service_1 = require("../prisma.service");
// @Module = decorador que define um modulo
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        // imports = modulos que este modulo precisa
        imports: [
            // PassportModule = biblioteca de autenticacao
            passport_1.PassportModule,
            // JwtModule = modulo de JWT
            // registerAsync = configuracao assincrona (espera ConfigService)
            jwt_1.JwtModule.registerAsync({
                // inject = injeta o ConfigService
                inject: [config_1.ConfigService],
                // useFactory = usa uma funcao para criar a configuracao
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'sua-chave-secreta',
                    signOptions: {
                        expiresIn: '7d',
                    },
                }),
            }),
        ],
        // controllers = as rotas HTTP deste modulo
        controllers: [auth_controller_1.AuthController],
        // providers = os servicos disponiveis
        providers: [
            auth_service_1.AuthService, // Logica de autenticacao
            jwt_strategy_1.JwtStrategy, // Validacao do JWT
            prisma_service_1.PrismaService, // Banco de dados
        ],
        // exports = o que este modulo oferece para outros modulos
        // Exemplo: UsersModule pode usar JwtStrategy
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
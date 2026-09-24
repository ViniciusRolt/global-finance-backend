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
exports.JwtStrategy = void 0;
// Importacoes
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport"); // Biblioteca de autenticacao
const passport_jwt_1 = require("passport-jwt"); // Extrai token do header
const prisma_service_1 = require("../prisma.service"); // Acessa o banco
// @Injectable = servico que pode ser injetado
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    // Recebe o PrismaService (banco de dados)
    constructor(prisma) {
        // Configuracao do JWT
        super({
            // De onde extrair o token?
            // Authorization: Bearer <token-aqui>
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration = false
            // Significa: nao ignore se o token expirou
            // Se token expirou, da erro
            ignoreExpiration: false,
            // Chave secreta para validar o token
            // Le de .env ou usa valor padrao
            secretOrKey: process.env.JWT_SECRET || 'sua-chave-secreta',
        });
        this.prisma = prisma;
    }
    // Validar o token
    // Se token eh valido, esta funcao eh chamada
    async validate(payload) {
        // payload = conteudo do token decodificado
        // payload.sub = id do usuario (definido quando criou o token)
        // Buscar usuario no banco pelo ID
        const usuario = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });
        // Se usuario nao existe mais, nega acesso
        if (!usuario) {
            return null;
        }
        // Se tudo ok, retorna dados do usuario
        // Este objeto fica disponivel em req.user nas rotas
        return {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)()
    // extends PassportStrategy(Strategy) = herda a estrategia do Passport
    ,
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map
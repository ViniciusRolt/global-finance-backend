import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        email: string;
        nome: string;
        id: string;
        criadoEm: Date;
    }>;
    updateProfile(userId: string, data: any): Promise<{
        email: string;
        nome: string;
        id: string;
    }>;
    getDashboard(userId: string): Promise<{
        usuario: {
            id: string;
        };
        contas: {
            id: string;
            banco: string;
            moeda: string;
            saldo: number;
        }[];
        saldoTotalGBP: any;
        transacoesRecentes: {
            id: string;
            data: Date;
            valor: number;
            categoria: string;
            descricao: string | null;
            tipo: string;
        }[];
        transacoesPorCategoria: {
            categoria: any;
            total: any;
        }[];
    }>;
    linkAccount(userId: string, data: any): Promise<{
        id: string;
        userId: string;
        banco: string;
        moeda: string;
        saldo: number;
        criadoEm: Date;
        atualizadoEm: Date;
    }>;
    getAccounts(userId: string): Promise<{
        id: string;
        criadoEm: Date;
        banco: string;
        moeda: string;
        saldo: number;
    }[]>;
}
//# sourceMappingURL=users.service.d.ts.map
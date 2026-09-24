import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        email: string;
        nome: string;
        id: string;
        criadoEm: Date;
    }>;
    updateProfile(req: any, data: any): Promise<{
        email: string;
        nome: string;
        id: string;
    }>;
    getDashboard(req: any): Promise<{
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
    getAccounts(req: any): Promise<{
        id: string;
        criadoEm: Date;
        banco: string;
        moeda: string;
        saldo: number;
    }[]>;
    linkAccount(req: any, data: any): Promise<{
        id: string;
        userId: string;
        banco: string;
        moeda: string;
        saldo: number;
        criadoEm: Date;
        atualizadoEm: Date;
    }>;
}
//# sourceMappingURL=users.controller.d.ts.map
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    create(req: any, data: CreateTransactionDto): Promise<{
        id: string;
        data: Date;
        valor: number;
        categoria: string;
        descricao: string | null;
        tipo: string;
    }>;
    findAll(req: any, categoria?: string, // Opcional
    contaId?: string, // Opcional
    limit?: string): Promise<{
        account: {
            banco: string;
            moeda: string;
        };
        id: string;
        data: Date;
        valor: number;
        categoria: string;
        descricao: string | null;
        tipo: string;
    }[]>;
    getSummary(req: any): Promise<{
        periodo: {
            inicio: Date;
            fim: Date;
        };
        receita: number;
        despesa: number;
        saldo: number;
    }>;
    getCategoryBreakdown(req: any, mes?: string, // Opcional (padrao: mes atual)
    ano?: string): Promise<{
        categoria: any;
        total: any;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        contaId: string;
        userId: string;
        valor: number;
        categoria: string;
        descricao: string | null;
        data: Date;
        tipo: string;
        criadoEm: Date;
        atualizadoEm: Date;
    }>;
}
//# sourceMappingURL=transactions.controller.d.ts.map
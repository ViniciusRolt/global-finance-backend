import { PrismaService } from '../prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: CreateTransactionDto): Promise<{
        id: string;
        data: Date;
        valor: number;
        categoria: string;
        descricao: string | null;
        tipo: string;
    }>;
    findAll(userId: string, filters?: any): Promise<{
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
    findOne(userId: string, id: string): Promise<{
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
    getSummary(userId: string): Promise<{
        periodo: {
            inicio: Date;
            fim: Date;
        };
        receita: number;
        despesa: number;
        saldo: number;
    }>;
    getCategoryBreakdown(userId: string, mes?: number, ano?: number): Promise<{
        categoria: any;
        total: any;
    }[]>;
}
//# sourceMappingURL=transactions.service.d.ts.map
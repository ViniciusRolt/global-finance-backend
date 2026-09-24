import { PrismaService } from '../prisma.service';
export declare class ExchangeService {
    private prisma;
    private readonly FRANKFURTER_API;
    constructor(prisma: PrismaService);
    getRates(from: string, to: string): Promise<{
        from: string;
        to: string;
        taxa: any;
        timestamp: Date;
        cacheado?: undefined;
    } | {
        from: string;
        to: string;
        taxa: number;
        timestamp: Date;
        cacheado: boolean;
    }>;
    getHistoricalRates(from: string, to: string, dias?: number): Promise<{
        from: string;
        to: string;
        dias: number;
        dados: {
            data: Date;
            taxa: number;
        }[];
    }>;
    convertAmount(valor: number, from: string, to: string): Promise<{
        original: {
            valor: number;
            moeda: string;
        };
        convertido: {
            valor: number;
            moeda: string;
        };
        taxa: any;
    }>;
}
//# sourceMappingURL=exchange.service.d.ts.map
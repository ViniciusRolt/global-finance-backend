import { ExchangeService } from './exchange.service';
export declare class ExchangeController {
    private exchangeService;
    constructor(exchangeService: ExchangeService);
    getRates(from?: string, to?: string): Promise<{
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
    getHistorical(from?: string, to?: string, dias?: string): Promise<{
        from: string;
        to: string;
        dias: number;
        dados: {
            data: Date;
            taxa: number;
        }[];
    }>;
    convert(valor: string, // Obrigatorio!
    from?: string, to?: string): Promise<{
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
//# sourceMappingURL=exchange.controller.d.ts.map
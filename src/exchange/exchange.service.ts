import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ExchangeService {
  private readonly FRANKFURTER_API = 'https://api.frankfurter.app';

  constructor(private prisma: PrismaService) {}

  async getRates(from: string, to: string) {
    try {
      const response = await fetch(`${this.FRANKFURTER_API}/latest?from=${from}&to=${to}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar taxas');
      }

      const data = await response.json();
      const taxa = (data as any).rates[to];

      if (!taxa) {
        throw new Error('Taxa nao encontrada');
      }

      // Salvar no banco (cache)
      await this.prisma.exchangeRate.create({
        data: {
          moedaBase: from,
          moedaAlvo: to,
          taxa,
        },
      });

      return {
        from,
        to,
        taxa,
        timestamp: new Date(),
      };
    } catch (erro) {
      // Se der erro, tenta buscar taxa mais recente no banco
      const taxaCacheada = await this.prisma.exchangeRate.findFirst({
        where: {
          moedaBase: from,
          moedaAlvo: to,
        },
        orderBy: {
          data: 'desc',
        },
      });

      if (taxaCacheada) {
        return {
          from,
          to,
          taxa: taxaCacheada.taxa,
          timestamp: taxaCacheada.data,
          cacheado: true,
        };
      }

      throw erro;
    }
  }

  async getHistoricalRates(from: string, to: string, dias: number = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    const taxas = await this.prisma.exchangeRate.findMany({
      where: {
        moedaBase: from,
        moedaAlvo: to,
        data: {
          gte: dataLimite,
        },
      },
      orderBy: {
        data: 'asc',
      },
      select: {
        data: true,
        taxa: true,
      },
    });

    return {
      from,
      to,
      dias,
      dados: taxas,
    };
  }

  async convertAmount(valor: number, from: string, to: string) {
    const dadosTaxa = await this.getRates(from, to);
    const valorConvertido = valor * dadosTaxa.taxa;

    return {
      original: {
        valor,
        moeda: from,
      },
      convertido: {
        valor: parseFloat(valorConvertido.toFixed(2)),
        moeda: to,
      },
      taxa: dadosTaxa.taxa,
    };
  }
}
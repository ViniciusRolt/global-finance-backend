import { Controller, Get, Query } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

// @Controller('exchange') = todas as rotas comecam com /exchange
@Controller('exchange')
export class ExchangeController {
  // Injeta o ExchangeService
  constructor(private exchangeService: ExchangeService) {}

  // ===== GET /exchange/rates =====
  // Pegar a taxa de cambio atual
  // Exemplo: GET /exchange/rates?from=BRL&to=GBP
  @Get('rates')
  async getRates(
    // @Query('from') = extrai o parametro ?from=BRL
    // = 'BRL' = valor padrao se nao fornecer
    @Query('from') from: string = 'BRL',
    @Query('to') to: string = 'GBP',
  ) {
    // Chama o servico
    return this.exchangeService.getRates(from, to);
  }

  // ===== GET /exchange/historical =====
  // Pegar historico de taxas
  // Exemplo: GET /exchange/historical?from=BRL&to=GBP&dias=30
  @Get('historical')
  async getHistorical(
    @Query('from') from: string = 'BRL',
    @Query('to') to: string = 'GBP',
    @Query('dias') dias: string = '30',
  ) {
    // parseInt() converte string "30" em numero 30
    return this.exchangeService.getHistoricalRates(from, to, parseInt(dias));
  }

  // ===== GET /exchange/convert =====
  // Converter um valor de uma moeda para outra
  // Exemplo: GET /exchange/convert?valor=1000&from=BRL&to=GBP
  @Get('convert')
  async convert(
    @Query('valor') valor: string,  // Obrigatorio!
    @Query('from') from: string = 'BRL',
    @Query('to') to: string = 'GBP',
  ) {
    // parseFloat() converte string "1000" em numero 1000
    return this.exchangeService.convertAmount(parseFloat(valor), from, to);
  }
}
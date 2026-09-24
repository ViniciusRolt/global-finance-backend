import { IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  contaId!: string;

  @IsNumber()
  valor!: number;

  @IsString()
  @IsIn(['Alimentacao', 'Transporte', 'Saude', 'Renda', 'Outros'])
  categoria!: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsIn(['income', 'expense'])
  tipo!: 'income' | 'expense';
}
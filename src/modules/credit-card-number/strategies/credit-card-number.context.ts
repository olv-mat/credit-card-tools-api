import { Injectable } from '@nestjs/common';
import { CreditCardNumberResponseDto } from '../dtos/credit-card-number-response.dto';
import { CreditCardNumberStrategy } from './credit-card-number.strategy';

@Injectable()
export class CreditCardNumberContext {
  constructor(private readonly strategy: CreditCardNumberStrategy) {}

  public execute(number: string): CreditCardNumberResponseDto {
    return this.strategy.validate(number);
  }
}

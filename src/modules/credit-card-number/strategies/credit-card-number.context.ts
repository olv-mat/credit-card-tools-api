import { Injectable } from '@nestjs/common';
import { CreditCardNumberValidationDto } from '../dtos/credit-card-number-validation.dto';
import { CreditCardNumberStrategy } from './credit-card-number.strategy';

@Injectable()
export class CreditCardNumberContext {
  constructor(private readonly strategy: CreditCardNumberStrategy) {}

  public execute(number: string): CreditCardNumberValidationDto {
    return this.strategy.validate(number);
  }
}

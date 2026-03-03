import { Injectable } from '@nestjs/common';
import { CreditCardNumberValidationDto } from './dtos/credit-card-number-validation.dto';
import { CreditCardNumberDto } from './dtos/credit-card-number.dto';
import { CreditCardNumberContext } from './strategies/credit-card-number.context';

@Injectable()
export class CreditCardNumberService {
  constructor(private readonly context: CreditCardNumberContext) {}

  public validate(dto: CreditCardNumberDto): CreditCardNumberValidationDto {
    return this.context.execute(dto.number);
  }
}

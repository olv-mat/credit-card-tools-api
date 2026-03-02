import { Injectable } from '@nestjs/common';
import { CreditCardNumberResponseDto } from './dtos/credit-card-number-response.dto';
import { CreditCardNumberDto } from './dtos/credit-card-number.dto';
import { CreditCardNumberContext } from './strategies/credit-card-number.context';

@Injectable()
export class CreditCardNumberService {
  constructor(private readonly context: CreditCardNumberContext) {}

  public validate(dto: CreditCardNumberDto): CreditCardNumberResponseDto {
    return this.context.execute(dto.number);
  }
}

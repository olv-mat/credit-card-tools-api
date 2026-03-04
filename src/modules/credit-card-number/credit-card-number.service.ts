import { BadRequestException, Injectable } from '@nestjs/common';
import { CreditCardNumberListDto } from './dtos/credit-card-number-list.dto';
import { CreditCardNumberValidationDto } from './dtos/credit-card-number-validation.dto';
import { CreditCardNumberDto } from './dtos/credit-card-number.dto';
import { CreditCardNumberContext } from './strategies/credit-card-number.context';

@Injectable()
export class CreditCardNumberService {
  constructor(private readonly context: CreditCardNumberContext) {}

  public generate(amount: number): CreditCardNumberListDto {
    if (amount < 1 || amount > 100) {
      throw new BadRequestException('Amount must be between 1 and 100');
    }

    const numbers: string[] = [];
    while (numbers.length < amount) {
      let number = '';
      for (let i = 0; i < 16; i++) {
        number += Math.floor(Math.random() * 10);
      }
      if (this.context.execute(number).isValid) {
        numbers.push(number);
      }
    }

    return CreditCardNumberListDto.create(numbers);
  }

  public validate(dto: CreditCardNumberDto): CreditCardNumberValidationDto {
    return this.context.execute(dto.number);
  }
}

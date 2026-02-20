import { Injectable } from '@nestjs/common';
import { CardValidationResponseDto } from 'src/modules/tools/dtos/CardValidationResponse.dto';
import { CardValidationStrategy } from './card-validation.strategy';

@Injectable()
export class CardValidationContext {
  constructor(private readonly strategy: CardValidationStrategy) {}

  public execute(number: string): CardValidationResponseDto {
    return this.strategy.validate(number);
  }
}

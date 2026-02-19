import { Injectable } from '@nestjs/common';
import { CardValidationStrategy } from './card-validation.strategy';

@Injectable()
export class CardValidationContext {
  constructor(private readonly strategy: CardValidationStrategy) {}

  public execute(number: string): boolean {
    return this.strategy.validate(number);
  }
}

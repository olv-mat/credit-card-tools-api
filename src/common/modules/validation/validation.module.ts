import { Module } from '@nestjs/common';
import { CardValidationContext } from './contexts/card-validation.context';
import { CardValidationStrategy } from './strategies/card-validation.strategy';
import { LuhnStrategy } from './strategies/implementations/luhn.strategy';

@Module({
  providers: [
    CardValidationContext,
    LuhnStrategy,
    { provide: CardValidationStrategy, useExisting: LuhnStrategy },
  ],
  exports: [CardValidationContext],
})
export class ValidationModule {}

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APILayerStrategy } from '../../../modules/bank-identification-number/strategies/implementations/api-layer.strategy';
import { CardValidationContext } from './card/card-validation.context';
import { CardValidationStrategy } from './card/card-validation.strategy';
import { LuhnAlgorithmStrategy } from './card/implementations/luhn-algorithm.strategy';

@Module({
  imports: [HttpModule],
  providers: [
    CardValidationContext,
    LuhnAlgorithmStrategy,
    APILayerStrategy,
    { provide: CardValidationStrategy, useExisting: LuhnAlgorithmStrategy },
  ],
  exports: [CardValidationContext],
})
export class ValidationModule {}

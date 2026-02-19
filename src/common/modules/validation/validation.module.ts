import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BINValidationStrategy } from './bin/bin-validation.strategy';
import { APILayerStrategy } from './bin/implementations/api-layer.strategy';
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
    { provide: BINValidationStrategy, useExisting: APILayerStrategy },
  ],
  exports: [CardValidationContext],
})
export class ValidationModule {}

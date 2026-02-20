import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BINValidationContext } from './bin/bin-validation.context';
import { BINValidationStrategy } from './bin/bin-validation.strategy';
import { APILayerStrategy } from './bin/implementations/api-layer.strategy';
import { CardValidationContext } from './card/card-validation.context';
import { CardValidationStrategy } from './card/card-validation.strategy';
import { LuhnAlgorithmStrategy } from './card/implementations/luhn-algorithm.strategy';

@Module({
  imports: [HttpModule],
  providers: [
    CardValidationContext,
    BINValidationContext,
    LuhnAlgorithmStrategy,
    APILayerStrategy,
    { provide: CardValidationStrategy, useExisting: LuhnAlgorithmStrategy },
    { provide: BINValidationStrategy, useExisting: APILayerStrategy },
  ],
  exports: [CardValidationContext, BINValidationContext],
})
export class ValidationModule {}

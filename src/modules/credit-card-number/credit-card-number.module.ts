import { Module } from '@nestjs/common';
import { CreditCardNumberController } from './credit-card-number.controller';
import { CreditCardNumberService } from './credit-card-number.service';
import { CreditCardNumberContext } from './strategies/credit-card-number.context';
import { CreditCardNumberStrategy } from './strategies/credit-card-number.strategy';
import { LuhnAlgorithmStrategy } from './strategies/implementations/luhn-algorithm.strategy';

@Module({
  controllers: [CreditCardNumberController],
  providers: [
    CreditCardNumberService,
    CreditCardNumberContext,
    LuhnAlgorithmStrategy,
    {
      provide: CreditCardNumberStrategy,
      useExisting: LuhnAlgorithmStrategy,
    },
  ],
})
export class CreditCardNumberModule {}

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BankIdentificationNumberController } from './bank-identification-number.controller';
import { BankIdentificationNumberService } from './bank-identification-number.service';
import { BankIdentificationNumberContext } from './strategies/bank-identification-number.context';
import { BankIdentificationNumberStrategy } from './strategies/bank-identification-number.strategy';
import { APILayerStrategy } from './strategies/implementations/api-layer.strategy';

@Module({
  imports: [HttpModule],
  controllers: [BankIdentificationNumberController],
  providers: [
    BankIdentificationNumberService,
    BankIdentificationNumberContext,
    APILayerStrategy,
    {
      provide: BankIdentificationNumberStrategy,
      useExisting: APILayerStrategy,
    },
  ],
})
export class BankIdentificationNumberModule {}

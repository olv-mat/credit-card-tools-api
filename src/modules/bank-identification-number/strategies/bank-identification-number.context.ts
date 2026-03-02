import { Injectable } from '@nestjs/common';
import { BankIdentificationNumberResponseDto } from '../dtos/bank-identification-number-response.dto';
import { BankIdentificationNumberStrategy } from './bank-identification-number.strategy';

@Injectable()
export class BankIdentificationNumberContext {
  constructor(private readonly strategy: BankIdentificationNumberStrategy) {}

  public execute(bin: string): Promise<BankIdentificationNumberResponseDto> {
    return this.strategy.validate(bin);
  }
}

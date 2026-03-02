import { Injectable } from '@nestjs/common';
import { BankIdentificationNumberResponseDto } from './dtos/bank-identification-number-response.dto';
import { BankIdentificationNumberDto } from './dtos/bank-identification-number.dto';
import { BankIdentificationNumberContext } from './strategies/bank-identification-number.context';

@Injectable()
export class BankIdentificationNumberService {
  constructor(private readonly context: BankIdentificationNumberContext) {}

  public async validate(
    dto: BankIdentificationNumberDto,
  ): Promise<BankIdentificationNumberResponseDto> {
    return this.context.execute(dto.bin);
  }
}

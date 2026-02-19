import { Injectable } from '@nestjs/common';
import { BINValidationResponseDto } from 'src/modules/tools/dtos/BINValidationResponse.dto';
import { BINValidationStrategy } from './bin-validation.strategy';

@Injectable()
export class BINValidationContext {
  constructor(private readonly strategy: BINValidationStrategy) {}

  public execute(bin: string): Promise<BINValidationResponseDto> {
    return this.strategy.validate(bin);
  }
}

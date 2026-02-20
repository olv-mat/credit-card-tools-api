import { Injectable } from '@nestjs/common';
import { BINValidationContext } from 'src/common/modules/validation/bin/bin-validation.context';
import { CardValidationContext } from 'src/common/modules/validation/card/card-validation.context';
import { BINNumberDto } from './dtos/BINNumber.dto';
import { BINValidationResponseDto } from './dtos/BINValidationResponse.dto';
import { CardNumberDto } from './dtos/CardNumber.dto';
import { CardValidationResponseDto } from './dtos/CardValidationResponse.dto';

@Injectable()
export class ToolsService {
  constructor(
    private readonly cardValidator: CardValidationContext,
    private readonly binValidator: BINValidationContext,
  ) {}

  public validateCard(dto: CardNumberDto): CardValidationResponseDto {
    return this.cardValidator.execute(dto.number);
  }

  public async validateBIN(
    dto: BINNumberDto,
  ): Promise<BINValidationResponseDto> {
    return this.binValidator.execute(dto.bin);
  }
}

import { Injectable } from '@nestjs/common';
import { BINValidationContext } from 'src/common/modules/validation/bin/bin-validation.context';
import { CardValidationContext } from 'src/common/modules/validation/card/card-validation.context';
import { BINNumberDto } from './dtos/bin-number.dto';
import { BINValidationResponseDto } from './dtos/bin-validation-response.dto';
import { CardNumberDto } from './dtos/card-number.dto';
import { CardValidationResponseDto } from './dtos/card-validation-response.dto';

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

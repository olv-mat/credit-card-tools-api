import { Injectable } from '@nestjs/common';
import { CardValidationContext } from 'src/common/modules/validation/card/card-validation.context';
import { CardNumberDto } from './dtos/CardNumber.dto';
import { CardValidationResponseDto } from './dtos/CardValidationResponse.dto';

@Injectable()
export class ToolsService {
  constructor(private readonly validator: CardValidationContext) {}

  public validateCard(dto: CardNumberDto): CardValidationResponseDto {
    return this.validator.execute(dto.number);
  }
}

import { Injectable } from '@nestjs/common';
import { CardValidationContext } from 'src/common/modules/validation/card/card-validation.context';
import { CardNumberDto } from './dtos/card-number.dto';
import { CardValidationResponseDto } from './dtos/card-validation-response.dto';

@Injectable()
export class ToolsService {
  constructor(private readonly cardValidator: CardValidationContext) {}

  public validateCard(dto: CardNumberDto): CardValidationResponseDto {
    return this.cardValidator.execute(dto.number);
  }
}

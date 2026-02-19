import { Injectable } from '@nestjs/common';
import { CardValidationContext } from 'src/common/modules/validation/card/card-validation.context';
import { CardNumberDto } from './dtos/CardNumber.dto';

@Injectable()
export class ToolsService {
  constructor(private readonly validator: CardValidationContext) {}

  public validateCard(dto: CardNumberDto): boolean {
    return this.validator.execute(dto.number);
  }
}

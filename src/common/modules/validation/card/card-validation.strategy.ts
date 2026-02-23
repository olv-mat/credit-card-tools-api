import { CardValidationResponseDto } from 'src/modules/tools/dtos/card-validation-response.dto';

export abstract class CardValidationStrategy {
  public abstract validate(number: string): CardValidationResponseDto;
}

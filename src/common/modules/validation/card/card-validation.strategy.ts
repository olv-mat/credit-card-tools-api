import { CardValidationResponseDto } from 'src/modules/tools/dtos/CardValidationResponse.dto';

export abstract class CardValidationStrategy {
  public abstract validate(number: string): CardValidationResponseDto;
}

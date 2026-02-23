import { BINValidationResponseDto } from 'src/modules/tools/dtos/bin-validation-response.dto';

export abstract class BINValidationStrategy {
  public abstract validate(bin: string): Promise<BINValidationResponseDto>;
}

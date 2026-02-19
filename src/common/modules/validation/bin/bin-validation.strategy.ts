import { BINValidationResponseDto } from 'src/modules/tools/dtos/BINValidationResponse.dto';

export abstract class BINValidationStrategy {
  public abstract validate(bin: string): Promise<BINValidationResponseDto>;
}

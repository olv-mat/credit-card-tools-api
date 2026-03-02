import { BankIdentificationNumberResponseDto } from '../dtos/bank-identification-number-response.dto';

export abstract class BankIdentificationNumberStrategy {
  public abstract validate(
    bin: string,
  ): Promise<BankIdentificationNumberResponseDto>;
}

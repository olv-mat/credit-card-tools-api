import { CreditCardNumberResponseDto } from '../dtos/credit-card-number-response.dto';

export abstract class CreditCardNumberStrategy {
  public abstract validate(number: string): CreditCardNumberResponseDto;
}

import { CreditCardNumberValidationDto } from '../dtos/credit-card-number-validation.dto';

export abstract class CreditCardNumberStrategy {
  public abstract validate(number: string): CreditCardNumberValidationDto;
}

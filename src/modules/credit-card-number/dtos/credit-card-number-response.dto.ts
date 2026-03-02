export class CreditCardNumberResponseDto {
  public readonly number: string;
  public readonly isValid: boolean;

  private constructor(number: string, isValid: boolean) {
    this.number = number;
    this.isValid = isValid;
  }

  public static create(
    number: string,
    isValid: boolean,
  ): CreditCardNumberResponseDto {
    return new CreditCardNumberResponseDto(number, isValid);
  }
}

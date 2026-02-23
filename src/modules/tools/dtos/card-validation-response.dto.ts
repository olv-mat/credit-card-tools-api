export class CardValidationResponseDto {
  public readonly number: string;
  public readonly isValid: boolean;

  private constructor(number: string, isValid: boolean) {
    this.number = number;
    this.isValid = isValid;
  }

  public static create(
    number: string,
    isValid: boolean,
  ): CardValidationResponseDto {
    return new CardValidationResponseDto(number, isValid);
  }
}

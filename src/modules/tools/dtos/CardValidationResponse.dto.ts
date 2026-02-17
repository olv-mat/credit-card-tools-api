export class CardValidationResponseDto {
  public readonly isValid: boolean;

  private constructor(isValid: boolean) {
    this.isValid = isValid;
  }

  public static create(isValid: boolean): CardValidationResponseDto {
    return new CardValidationResponseDto(isValid);
  }
}

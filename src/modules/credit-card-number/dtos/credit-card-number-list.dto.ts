export class CreditCardNumberListDto {
  public readonly numbers: string[];

  private constructor(numbers: string[]) {
    this.numbers = numbers;
  }

  public static create(numbers: string[]): CreditCardNumberListDto {
    return new CreditCardNumberListDto(numbers);
  }
}

export class CreditCardNumberListDto {
  public readonly numbers: number[];

  private constructor(numbers: number[]) {
    this.numbers = numbers;
  }

  public static create(numbers: number[]): CreditCardNumberListDto {
    return new CreditCardNumberListDto(numbers);
  }
}
